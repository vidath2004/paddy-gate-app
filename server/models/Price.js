const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  millId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Mill'
  },
  riceVariety: {
    type: String,
    required: true,
    enum: ['Basmati', 'Red Rice', 'White Rice', 'Brown Rice']
  },
  pricePerKg: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  updateTimestamp: {
    type: Date,
    default: Date.now
  },
  historicalPrices: [{
    price: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  district: {
    type: String,
    required: true
  }
});

// Custom validation for price reasonableness
PriceSchema.path('pricePerKg').validate(function(value) {
  return value >= 0 && value <= 1000;
}, 'Price must be between 0 and 1000');

module.exports = mongoose.model('Price', PriceSchema);