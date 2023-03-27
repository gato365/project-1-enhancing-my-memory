const { Score } = require('../models');


odule.exports = {
    // GET /scores
    createScore(req, res) {
        Score.create(req.body)
            .then(score => res.json(score))
            .catch(err => res.status(422).json(err));
    },

    // POST /scores
    getScores(req, res) {
        Score.find(req.query)

            .then(scores => res.json(scores))
            .catch(err => res.status(422).json(err));
    },
}

