const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please sign up first.' });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // 4. Generate JWT
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', {
      expiresIn: '1d',
    });

    // 5. Respond with token and user
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
