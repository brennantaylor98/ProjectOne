const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(500).send({ error: 'Invalid email or password' });
    }
    if (password !== user.password) {
      return res.status(500).send({ error: 'Invalid email or password' });
    }

    res.send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error logging in' });
  }
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      name,
      email,
      password
    });

    // Hash password 
    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(user => {
        jwt.sign(
          { id: user.id },
          'SECRET_KEY', // Replace with your own secret key
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      });
    });
  });
});


module.exports = router; 

