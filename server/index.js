'use strict';

const Express = require('express');
const app = Express();

const http = require('http').Server(app);
const Io = require('socket.io')(http, { origins: '*:*' });
const Cors = require('cors');

const FS = require('fs');

//// CONSTANTS
const PORT = process.env.PORT || 5000; // This is an ABSOLUTE GIVEN

//// STATE
const projectors = {}; // Map of <projector client ids, profile ids>

let profiles = []; // Complete list with state

let controllers = []; // Controllers with streams

//// METHODS
function SendProfile(socket, profileId) {
    const profile = profiles.find(p => p.id === profileId);

    // Send the data and register the projector
    if (profile) {
        socket.emit('profile stream', { timestamp: Date.now(), ...profile });
        return true;
    }
    // ...unless if the profile id is not recognized, return false
    else {
        socket.emit('profile stream', {
            request: data,
            error: { message: 'The profile id is unrecognized' },
        });
        return false;
    }
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
const Pio = Io; //.of('/projector');

Pio.on('connection', socket => {
    console.log(`Projector connected     (id: ${socket.id})`);

    // Send updates to all controllers
    Cio.emit('stream', { data: profiles, projectors });

    // List
    socket.on('profile list', () => {
        console.log(`Requested profile list  (id: ${socket.id})`);
        socket.emit('response profile list', profiles);
    });

    // Request to start a profile stream
    socket.on('profile stream start', data => {
        // Validate request
        if (data.profileId == null) {
            socket.emit('profile stream', {
                request: data,
                error: { message: 'No profile id was sent' },
            });

            // Check the profiles list
        } else {
            socket.join(data.profileId);
            if (SendProfile(socket, data.profileId))
                projectors[socket.id] = data.profileId;
        }
    });

    // Request to refresh a profile stream
    socket.on('profile stream ping', () => {
        const profileId = projectors[socket.id];

        // If projector is registered, send the profile, else send an error
        if (profileId) {
            SendProfile(socket, profileId);
        } else {
            socket.emit('profile stream', {
                error: {
                    message: 'The client is not registered as a projector',
                },
            });
        }
    });

    socket.on('disconnect', () => {
        console.log(`Projector disconnected  (id: ${socket.id})`);

        // Remove from lists
        if (socket.id && projectors[socket.id]) {
            socket.leave(projectors[socket.id]);
            delete projectors[socket.id];

            // Send updates to all controllers
            Cio.emit('stream', { data: profiles, projectors });
        }
    });
});

//// CONTROLLER
const Cio = Io.of('/controller');

let lastTimestamp = Number.MIN_SAFE_INTEGER;

Cio.on('connection', socket => {
    console.log(`Controller connected    (id: ${socket.id})`);

    // Register controller
    controllers.push(socket.id);
    socket.emit('stream', { data: profiles, projectors });

    socket.on('update', data => {
        const profile = profiles.find(a => a.id === data.profileId);

        if (profile) {
            // Update if the data is newer than last data
            if (lastTimestamp < data.timestamp) {
                // Make sure id is not set again
                delete data.data.id;
                Object.assign(profile, data.data);

                // Update projectors
                SendProfile(Io.to(profile.id), profile.id);

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

    // Unregister controller
    socket.on('disconnect', () => {
        console.log(`Controller disconnected (id: ${socket.id})`);
        controllers = controllers.filter(a => a !== socket.id);
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