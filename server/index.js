const Express = require('express')
const app = Express()

const http = require('http').Server(app)
const Io = require('socket.io')(http)
    // const Cors = require('cors')

const FS = require('fs');

//// CONSTANTS
const PORT = 3000 // This is an ABSOLUTE GIVEN

const SUCCESS = 'success'
const FAILED = 'failed'

//// STATE
let profiles = [];


//// INT MAIN

// Read Json
FS.readFile('profiles-list.json', (err, data) => {
    profiles = JSON.parse(data)
    console.log("Loaded profiles")
})

// Socket
Io.on('connection', socket => {
    console.log(`Client connected    (id: ${socket.id})`)

    socket.emit('profile list', profiles)
    socket.on('disconnect', () => console.log(`Client disconnected (id: ${socket.id})`))
})

// Start server
http.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})

// Serve a public directory
// 
// app.listen(PORT, () => console.log(`Listening at ${PORT}`))
// app.use(express.static('../controller'))
// app.use(cors())
// app.use(express.json({ limit: '1mb' }))