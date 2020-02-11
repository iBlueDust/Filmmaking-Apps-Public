const Express = require('express')
const app = Express()

const http = require('http').Server(app)
const Io = require('socket.io')(http)
const Cors = require('cors')

const FS = require('fs');

//// CONSTANTS
const PORT = 3000 // This is an ABSOLUTE GIVEN

const SUCCESS = 'success'
const FAILED = 'failed'

//// STATE
let listProfiles = []; // Only for listing profiles
let projectors = {}; // Map of <projector client ids, profile ids>

let profiles = []; // Complete list with state


//// METHODS
function SendProfile(socket, profileId) {
    const profile = profiles.find(p => p.id === profileId)

    // Send the data and register the projector
    if (profile) {
        projectors[socket.id] = profile.id;
        socket.emit('profile stream', { timestamp: Date.now(), ...profile });
    }
    // ...unless if the profile id is not recognized
    else socket.emit('profile stream', { request: data, error: { message: 'The profile id is unrecognized' } })
}


//// INT MAIN

// Read Json
FS.readFile('profiles-list.json', (err, data) => {
    listProfiles = JSON.parse(data)
    profiles = JSON.parse(data)
    console.log("Loaded profiles")
})

// Socket
Io.on('connection', socket => {
    console.log(`Client connected    (id: ${socket.id})`)

    //// LIST
    // Profile List
    socket.on('profile list', () => {
        socket.emit('response profile list', listProfiles)
    })

    //// PROJECTOR
    // Request to start a profile stream
    socket.on('profile stream start', data => {
        // Validate request
        if (data.profileId == null) {
            socket.emit('profile stream', { request: data, error: { message: 'No profile id was sent' } })

            // Check the profiles list
        } else {
            SendProfile(socket, data.profileId)
        }
    })

    // Request to refresh a profile stream
    socket.on('profile stream ping', () => {
        const profileId = projectors[socket.id]

        // If projector is registered, send the profile, else send an error
        if (profileId) {
            SendProfile(socket, profileId)
        } else {
            socket.emit('profile stream', { error: { message: "The client is not registered as a projector" } })
        }
    })

    socket.on('disconnect', () => {
        console.log(`Client disconnected (id: ${socket.id})`)

        // Remove from projector list
        delete projectors[socket.id]
    })

    //// CONTROLLER
    // Update profile state
    socket.on('profile update', data => {
        // Request validation
        if (!data.profileId)
            socket.emit('response profile update', { request: data, error: { message: 'No profile id was sent' } })
        else if (!data.data)
            socket.emit('response profile update', { request: data, error: { message: 'No profile data was sent' } })

        // Apply the update
        else {
            const profile = profiles.find(a => a.id === data.profileId);

            // Update profile
            if (profile) {
                Object.assign(profile, data.data)

                // Send an error if profile is not recognized
            } else {
                socket.emit('response profile update', { request: data, error: { message: 'The profile id is not recognized' } })
            }
            // Send an error if no profile id was specified
        }
    })
})

// Start server
http.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})

// Serve a public directory

app.use(Express.static('./controller'))
app.use(Cors())
app.use(Express.json({ limit: '1mb' }))