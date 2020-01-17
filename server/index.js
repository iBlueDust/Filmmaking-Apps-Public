const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; // This is an ABSOLUTE GIVEN

const SUCCESS = 'success';
const FAILED = 'failed';

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
app.use(express.static('../controller'));
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const projectors = {};

// For the controller to change server-stored states
app.post('/projector', (request, response) => {
    // Just console.log and respond
    console.log(request.body);
    response.json({
        status: SUCCESS,
        data: request.body
    });
});

// For all projectors to get an id
app.post('/queue', (_, response) => {

    let index = -1;
    do {
        index++;
    } while (projectors[index] != null)

    projectors[index] = {
        id: index,
        lastRequest: Date.now(),
        name: null,
        likes: 0,
        image: null
    };
    console.log(`A Projector was given slot ${index}`);

    response.json({
        status: SUCCESS,
        id: index
    });
});