const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['Farmer', 'Miller', 'Admin'],
    required: true
  },
  profile: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    contact: {
      phone: {
        type: String,
        match: [/^[0-9]{10}$/, 'Please provide a valid phone number']
      }
    },
    location: {
      district: String,
      geoLocation: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number]
        }
      }
    }
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  accountStatus: {
    type: String,
    enum: ['Active', 'Suspended', 'Pending'],
    default: 'Pending'
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);