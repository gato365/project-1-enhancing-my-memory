const router = require('express').Router();

const { createScore, getScores } = require('../../controllers/scoreController');

router.route('/').post(createScore).get(getScores);

module.exports = router;