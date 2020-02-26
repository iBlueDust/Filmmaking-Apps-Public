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

//// METHODS
function UpdateProjectors() {
    console.log('Updating all projectors');
    Pio.emit('stream', {
        timestamp: Date.now(),
        profiles,
        mode: projectorMode,
    });
}

function UpdateControllers() {
    console.log('Updating all controllers');
    Cio.emit('stream', { data: profiles, projectors, projectorMode });
}

//// INT MAIN

// Read Json
FS.readFile('profiles-list.json', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    profiles = JSON.parse(data);
    console.log('Loaded profiles');
});

//// PROJECTOR
const Pio = Io.of('/projector');

Pio.on('connection', socket => {
    function SendToThisProjector() {
        socket.emit('stream', {
            timestamp: Date.now(),
            profiles,
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
        socket.emit('response list', profiles);
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
    socket.emit('stream', { data: profiles, projectors, projectorMode });

    let updateLastTimestamp = Number.MIN_SAFE_INTEGER;
    socket.on('update', data => {
        const profile = profiles.find(a => a.id === data.profileId);

        if (profile) {
            // Update if the data is newer than last data
            if (updateLastTimestamp < data.timestamp) {
                // Make sure id is not set again
                delete data.data.id;
                Object.assign(profile, data.data);

                // FIXME profile.disabled is somehow initialized to undefined although it is in profiles-list.json

                // Update projectors
                UpdateProjectors();
                // UpdateControllers(); // Try updating all _other_ controllers instead

                console.log(`Updated profile by ${socket.id}`);
            }
            socket.emit('response update', { request: data, error: null });
        } else {
            socket.emit('response update', {
                request: data,
                error: { message: 'Profile id is not recognized' },
            });
        }
    });

    let updateProjectorModeLastTimestamp = Number.MIN_SAFE_INTEGER;
    socket.on('update projectormode', data => {
        // Check request timestamp;
        if (data.timestamp < updateProjectorModeLastTimestamp) {
            console.warn(
                `Received outdated projector mode update request (id: ${socket.id})`
            );
            return;
        } else updateProjectorModeLastTimestamp = data.timestamp;

        data.mode = data.mode.toLowerCase();
        if (data.mode && PROJECTOR_MODES.includes(data.mode)) {
            projectorMode = data.mode;
            console.log(
                `Updated projectorMode to ${data.mode} by (id: ${socket.id})`
            );

            // Don't forget to update all controllers and projectors
            UpdateControllers();
            UpdateProjectors();
        } else
            console.warn(
                `Error in updating projectorMode to ${data.mode} by (id: ${socket.id})`
            );
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
app.use(Express.static('../controller/dist'));
app.use(Cors());
app.use(Express.json({ limit: '1mb' }));