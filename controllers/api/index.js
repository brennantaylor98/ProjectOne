const path = require('path');
const router = require('express').Router();

const userRoutes = require('./userRoutes');
const walletRoutes = require('./walletRoutes');
const expenseRoutes = require('./expenseRoutes');

router.use('/users', userRoutes);
router.use('/dashboard', walletRoutes);
router.use('/expenses', expenseRoutes);


module.exports = router;
