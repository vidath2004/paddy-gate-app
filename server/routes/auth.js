const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
      const { username, email, password, role, profile } = req.body;
  
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }
  
      // Create user
      const user = await User.create({
        username,
        email,
        password,
        role,
        profile
      });
  
      if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          profile: user.profile,
          accountStatus: user.accountStatus,
          token: generateToken(user._id)
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        message: 'Server error during registration', 
        error: error.message 
      });
    }
  });

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is active
    if (user.accountStatus !== 'Active') {
      return res.status(401).json({ message: 'Account is not active. Please contact administrator.' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile,
      accountStatus: user.accountStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;