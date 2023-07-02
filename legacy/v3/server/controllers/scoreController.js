const  Scores  = require('../models/Scores');

module.exports = {
    // POST /scores
    async createScore(req, res) {
        try {
            const score = await Scores.create(req.body);
            res.json(score);


        } catch (err) {
            console.error('Error:', err);
            res.status(500).json(err);
        }
    },
 
    // GET /scores
    getScores(req, res) {
        Scores.find(req.query)
            .then(scores => res.json(scores))
            .catch(err => res.status(422).json(err));
    },

    // GET /scores/:id
    async getScore(req, res) {
        const { id } = req.params;

        // You can add input validation here if necessary

        try {
            const score = await Scores.findById(id);
            if (!score) {
                return res.status(404).json({ error: 'Score not found.' });
            }
            res.json(score);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
