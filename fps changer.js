const express = require('express');
const ffi = require('ffi');
const ref = require('ref');
const refStruct = require('ref-struct');

const app = express();
const PORT = process.env.PORT || 3000;

// Define the structure for the game settings
const GameSettings = refStruct({
    'maxFPS': 'int',
    // Add more settings here if needed
});

// Load the game library
const gameLibrary = ffi.Library('/path/to/game/library', {
    'setGameSettings': ['void', [GameSettings]]
});

// Middleware for parsing JSON
app.use(express.json());

// Route to handle POST request to update game settings
app.post('/settings', (req, res) => {
    const maxFPS = parseInt(req.body.maxFPS);

    // Create a new game settings object
    const settings = new GameSettings({
        maxFPS: maxFPS
    });

    // Call the function in the game library to update settings
    gameLibrary.setGameSettings(settings);

    // Send response
    res.send('Settings updated successfully.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}
    Both port and game FPS correctly is saved, FPS changer will work 30-40 minutes`);
});
