const router = require('express').Router();
const scoreRoutes = require('./scoreRoutes');

router.use('/scores', scoreRoutes);

module.exports = router;