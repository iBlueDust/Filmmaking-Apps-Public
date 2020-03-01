'use strict';

const Express = require('express');
const app = Express();

const http = require('http').Server(app);
const Io = require('socket.io')(http, { origins: '*:*' });
const Cors = require('cors');

const FS = require('fs');

//// CONSTANTS
const PORT = process.env.PORT || 5000; // This is an ABSOLUTE GIVEN

const SLIDESHOW = 'slideshow';
const SPLIT = 'split';
const PROJECTOR_MODES = [SLIDESHOW, SPLIT];

const MAX_PROFILE = 2;

// TODO Better state management
//// STATE
let projectors = [];
let projectorMode = 'slideshow'; // Whether to `slideshow` between profiles or `split` the two profiles side by side

let profiles = []; // Complete list with state

function embeddedProfiles() {
    return profiles.map(profile => ({
        ...profile,
        images: profile.images.map(image => '/' + image),
        // images: profile.images.map(image => 'data:image/png;base64,' + (imageCache[image] || image)),
    }));
}

const imageCache = {};

//// METHODS
function UpdateProjectors() {
    console.log('Updating all projectors');
    Pio.emit('stream', {
        timestamp: Date.now(),
        profiles: embeddedProfiles(),
        mode: projectorMode,
    });
}

function UpdateControllers() {
    console.log('Updating all controllers');
    Cio.emit('stream', { data: embeddedProfiles(), timestamp: Date.now(), projectors, projectorMode });
}

//// INT MAIN

// Try reading the cache
if (FS.existsSync('./cache.json')) {
    try {
        const data = FS.readFileSync('./cache.json', 'utf-8');

        const parsedData = JSON.parse(data);

        projectorMode = parsedData.projectorMode;
        profiles = parsedData.profiles;

        console.log('Loaded cache. To invalidate, delete ./cache.json');
    } catch (err) {
        console.error(err);
        ReadProfileTemplates();
    }
} else ReadProfileTemplates();

// Else, fallback to profiles-list.json
function ReadProfileTemplates() {
    try {
        const data = FS.readFileSync('./profiles-list.json', 'utf-8');

        profiles = JSON.parse(data);
        console.log('Loaded profiles');
    } catch (err) {
        console.error(err);
        return;
    }
}

//// Read images
// profiles.forEach((profile, pi) => {
//     profile.images.forEach((image, ii) => {
//         try {
//             const bitmap = FS.readFileSync(image);
//             imageCache[image] = Buffer.from(bitmap).toString('base64');
//         } catch (error) {}
//     });
// });

// Save loop
let saveLoop = setInterval(() => {
    FS.writeFile('./cache.json', JSON.stringify({ projectorMode, profiles }), 'utf-8', (err, result) => {
        if (err) console.error(err);
        console.log('Save loop');
    });
}, 10000);

//// PROJECTOR
const Pio = Io.of('/projector');

Pio.on('connection', socket => {
    function SendToThisProjector() {
        socket.emit('stream', {
            timestamp: Date.now(),
            profiles: embeddedProfiles(),
            mode: projectorMode,
        });
    }

    console.log(`Projector connected     (id: ${socket.id})`);

    projectors.push(socket.id);

    // Send updates to all controllers
    UpdateControllers();
    SendToThisProjector();

    // Ping
    socket.on('stream ping', SendToThisProjector);

    // List
    socket.on('list', () => {
        console.log(`Requested profile list  (id: ${socket.id})`);
        socket.emit('response list', embeddedProfiles());
    });

    socket.on('disconnect', () => {
        console.log(`Projector disconnected  (id: ${socket.id})`);

        // Remove from lists
        projectors = projectors.filter(a => a !== socket.id);

        // Send updates to all controllers
        UpdateControllers();
    });
});

//// CONTROLLER
const Cio = Io.of('/controller');

Cio.on('connection', socket => {
    console.log(`Controller connected    (id: ${socket.id})`);

    // Send initializing data
    socket.emit('stream', { data: embeddedProfiles(), timestamp: -1, projectors, projectorMode });

    let updateLastTimestamp = Number.MIN_SAFE_INTEGER;
    socket.on('update', data => {
        const profile = profiles.find(a => a.id === data.profileId);

        if (profile) {
            // Update if the data is newer than last data
            if (updateLastTimestamp < data.timestamp) {
                updateLastTimestamp = data.timestamp;

                // ===== VULNERABILITY =====
                // Note: If the client sends a string value that's to long (e.g. an embedded base64 image)
                // The server will crash on the next save loop

                // Make sure id is not set again
                delete data.data.id;
                delete data.data.images; // Images can get very very long in length
                Object.assign(profile, data.data);

                // FIXME profile.disabled is somehow initialized to undefined although it is in profiles-list.json

                // Update projectors
                UpdateProjectors();
                // UpdateControllers(); // Try updating all _other_ controllers instead

                console.log(`Updated profile by ${socket.id}`);
                socket.emit('response update', { request: data, error: null });
            } else {
                socket.emit('response update', { request: data, error: { message: 'Outdated timestamp' } });
                console.warn(`Received outdated profile update request (id: ${socket.id})`);
            }
        } else {
            socket.emit('response update', {
                request: data,
                error: { message: 'Profile ID is not recognized' },
            });
            console.warn(`Received invalid profile id update request (id: ${socket.id})`);
        }
    });

    // Show/hide a notification request
    socket.on('notification show', data => {
        Pio.emit('notification show', data);
        socket.emit('response notification show', { request: data, error: null });
    });

    socket.on('notification hide', data => {
        Pio.emit('notification hide');
        socket.emit('response notification hide', { request: data, error: null });
    });

    // Process requests to change routes of all projectors
    let routeLastTimestamp = Number.MIN_SAFE_INTEGER;
    socket.on('route', data => {
        if (data.timestamp > routeLastTimestamp) {
            Pio.emit('route', data);

            socket.emit('response route', { request: data, error: null });
            console.log(`Routed all projectors to ${data.name}`);
        } else {
            socket.emit('response route', { request: data, error: { message: 'Outdated timestamp' } });
            console.error(`Received route request with outdated timestamp (id: ${socket.id})`);
        }
    });

    let updateProjectorModeLastTimestamp = Number.MIN_SAFE_INTEGER;
    socket.on('update projectormode', data => {
        // Check request timestamp;
        if (data.timestamp < updateProjectorModeLastTimestamp) {
            console.warn(`Received outdated projector mode update request (id: ${socket.id})`);
            socket.emit('response update projectormode', { request: data, error: { msg: 'Outdated timestamp' } });
        } else updateProjectorModeLastTimestamp = data.timestamp;

        data.mode = data.mode.toLowerCase();
        if (data.mode && PROJECTOR_MODES.includes(data.mode)) {
            projectorMode = data.mode;
            console.log(`Updated projectorMode to ${data.mode} by (id: ${socket.id})`);

            // Don't forget to update all controllers and projectors
            UpdateControllers();
            UpdateProjectors();
        } else console.warn(`Error in updating projectorMode to ${data.mode} by (id: ${socket.id})`);
        socket.emit('response update projectormode', { request: data, error: { msg: 'Invalid projector mode' } });
    });

    // Unregister controller
    socket.on('disconnect', () => {
        console.log(`Controller disconnected (id: ${socket.id})`);
    });
});

// Start server
http.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});

// Serve a public directory
app.use('/photos', Express.static(__dirname + '/photos'));

if (process.argv.some(a => a === '--static')) {
    app.use('/controller', Express.static('../controller/dist'));
    app.use(Express.static('../projector/dist'));
}

app.use(Cors());
app.use(Express.json({ limit: '1mb' }));