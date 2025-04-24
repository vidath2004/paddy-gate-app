const express = require('express');
const router = express.Router();
const Mill = require('../models/Mill');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/mills
// @desc    Get all mills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { district, specialization } = req.query;
    let query = { verificationStatus: 'Verified' };

    if (district) query['location.district'] = district;
    if (specialization) query.specializations = specialization;

    const mills = await Mill.find(query);
    res.json(mills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/mills
// @desc    Create a mill
// @access  Private (Miller only)
router.post('/', protect, authorize('Miller'), async (req, res) => {
  try {
    const { name, location, contactInfo, specializations } = req.body;

    const mill = await Mill.create({
      name,
      owner: req.user._id,
      location,
      contactInfo,
      specializations
    });

    res.status(201).json(mill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/mills/miller
// @desc    Get miller's mills
// @access  Private (Miller only)
router.get('/miller', protect, authorize('Miller'), async (req, res) => {
  try {
    const mills = await Mill.find({ owner: req.user._id });
    res.json(mills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/mills/:id
// @desc    Update a mill
// @access  Private (Miller only)
router.put('/:id', protect, authorize('Miller'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, contactInfo, specializations } = req.body;

    // Check if mill belongs to the user
    let mill = await Mill.findById(id);
    if (!mill) {
      return res.status(404).json({ message: 'Mill not found' });
    }

    if (mill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this mill' });
    }

    // Update mill
    mill = await Mill.findByIdAndUpdate(
      id,
      { name, location, contactInfo, specializations },
      { new: true, runValidators: true }
    );

    res.json(mill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;