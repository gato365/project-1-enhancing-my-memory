const { Score } = require('../models');

module.exports = {
    // POST /scores
    async createScore(req, res) {
        const { date, percentage, time, enteredText, selectedLetters, selectedNumbers, currentLine } = req.body;

        // You can add input validation here if necessary

        try {
            const score = new Score({ date, percentage, time, enteredText, selectedLetters, selectedNumbers, currentLine });
            await score.save();
            res.json(score);
        } catch (err) {
            res.status(422).json(err);
        }
    },

    // GET /scores
    getScores(req, res) {
        Score.find(req.query)
            .then(scores => res.json(scores))
            .catch(err => res.status(422).json(err));
    },

    // GET /scores/:id
    async getScore(req, res) {
        const { id } = req.params;

        // You can add input validation here if necessary

        try {
            const score = await Score.findById(id);
            if (!score) {
                return res.status(404).json({ error: 'Score not found.' });
            }
            res.json(score);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
