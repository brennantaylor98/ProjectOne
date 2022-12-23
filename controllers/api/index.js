const path = require('path');
const router = require('express').Router();
const userRoutes = require(path.resolve("controllers", "api", "userRoutes"))
const walletRoutes = require(path.resolve("controllers", "api", "walletRoutes"))

router.use('/users', userRoutes);
router.use('/wallet', walletRoutes);

module.exports = router;
