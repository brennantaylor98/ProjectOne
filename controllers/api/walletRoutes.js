const router = require('express').Router();
const { Wallet } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newWallet = await Wallet.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWallet);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;


