const router = require('express').Router();
const userRoutes = require('./userRoutes');
const walletRoutes = require('./walletRoutes');

router.use('/users', userRoutes);
router.use('/dashboard', walletRoutes);

module.exports = router;
