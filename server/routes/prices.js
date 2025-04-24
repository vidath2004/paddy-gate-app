const express = require('express');
const router = express.Router();
const Price = require('../models/Price');
const Mill = require('../models/Mill');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/prices
// @desc    Get all rice prices
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { district, riceVariety } = req.query;
    let query = {};

    if (district) query.district = district;
    if (riceVariety) query.riceVariety = riceVariety;

    const prices = await Price.find(query).populate({
      path: 'millId',
      select: 'name location contactInfo'
    });

    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/prices
// @desc    Add or update rice price
// @access  Private (Miller only)
router.post('/', protect, authorize('Miller'), async (req, res) => {
  try {
    const { millId, riceVariety, pricePerKg, district } = req.body;

    // Check if mill belongs to the user
    const mill = await Mill.findById(millId);
    if (!mill) {
      return res.status(404).json({ message: 'Mill not found' });
    }

    if (mill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update prices for this mill' });
    }

    // Find existing price or create new one
    let price = await Price.findOne({ millId, riceVariety });

    if (price) {
      // Update existing price
      price.historicalPrices.push({
        price: price.pricePerKg,
        timestamp: price.updateTimestamp
      });

      // Limit historical prices array to 50 entries
      if (price.historicalPrices.length > 50) {
        price.historicalPrices = price.historicalPrices.slice(-50);
      }

      price.pricePerKg = pricePerKg;
      price.updateTimestamp = Date.now();
      
      await price.save();
    } else {
      // Create new price
      price = await Price.create({
        millId,
        riceVariety,
        pricePerKg,
        district,
        historicalPrices: []
      });
    }

    res.status(201).json(price);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/prices/history/:millId/:riceVariety
// @desc    Get price history for a specific mill and rice variety
// @access  Public
router.get('/history/:millId/:riceVariety', async (req, res) => {
  try {
    const { millId, riceVariety } = req.params;

    const price = await Price.findOne({ millId, riceVariety });
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    // Include current price in history
    const history = [
      ...price.historicalPrices,
      { price: price.pricePerKg, timestamp: price.updateTimestamp }
    ];

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;