const router = require('express').Router();
const { Expense } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const ExpenseData = await Expense.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(ExpenseData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;


