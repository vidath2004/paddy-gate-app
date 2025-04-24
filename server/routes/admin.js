const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Mill = require('../models/Mill');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', protect, authorize('Admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private (Admin only)
router.put('/users/:id/status', protect, authorize('Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { accountStatus } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { accountStatus },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/admin/mills
// @desc    Get all mills (including unverified)
// @access  Private (Admin only)
router.get('/mills', protect, authorize('Admin'), async (req, res) => {
  try {
    const mills = await Mill.find().populate('owner', 'username email');
    res.json(mills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/admin/mills/:id/verify
// @desc    Verify a mill
// @access  Private (Admin only)
router.put('/mills/:id/verify', protect, authorize('Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { verificationStatus } = req.body;

    const mill = await Mill.findByIdAndUpdate(
      id,
      { verificationStatus },
      { new: true, runValidators: true }
    );

    if (!mill) {
      return res.status(404).json({ message: 'Mill not found' });
    }

    res.json(mill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;