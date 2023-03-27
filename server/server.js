const express = require('express');

const bodyParser = require('body-parser');
const db = require('./config/connection');
const routes = require('./routes');


// Set up Express app
const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());


// Save date, percentage,time, entered text selected Letters, selectedNumbers, currentLine

app.post('/save-data', async (req, res) => {

    const { date, percentage, time, enteredText, selectedLetters, selectedNumbers, currentLine } = req.body;
    const score = new Score({ date, percentage, time, enteredText, selectedLetters, selectedNumbers, currentLine });
    await score.save();
    res.send(score);
});


// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Here is the link http://localhost:${PORT}`)
    });

});
