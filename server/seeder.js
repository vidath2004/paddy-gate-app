const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Mill = require('./models/Mill');
const Price = require('./models/Price');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Sample data
const users = [
  {
    username: 'admin',
    email: 'admin@paddygate.com',
    password: 'password123',
    role: 'Admin',
    profile: {
      name: 'Admin User',
      contact: {
        phone: '1234567890'
      },
      location: {
        district: 'Colombo'
      }
    },
    accountStatus: 'Active'
  },
  {
    username: 'miller1',
    email: 'miller1@paddygate.com',
    password: 'password123',
    role: 'Miller',
    profile: {
      name: 'Mill Owner 1',
      contact: {
        phone: '1234567891'
      },
      location: {
        district: 'Kandy'
      }
    },
    accountStatus: 'Active'
  },
  {
    username: 'farmer1',
    email: 'farmer1@paddygate.com',
    password: 'password123',
    role: 'Farmer',
    profile: {
      name: 'Farmer 1',
      contact: {
        phone: '1234567892'
      },
      location: {
        district: 'Anuradhapura'
      }
    },
    accountStatus: 'Active'
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Mill.deleteMany();
    await Price.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    
    const adminUser = createdUsers[0]._id;
    const millerUser = createdUsers[1]._id;

    // Create mills
    const mills = [
      {
        name: 'Golden Rice Mill',
        owner: millerUser,
        location: {
          district: 'Kandy',
          address: '123 Mill Road, Kandy'
        },
        contactInfo: {
          phone: '1234567891',
          email: 'golden@mill.com'
        },
        specializations: ['Basmati', 'White Rice'],
        verificationStatus: 'Verified'
      }
    ];

    const createdMills = await Mill.insertMany(mills);

    // Create prices
    const prices = [
      {
        millId: createdMills[0]._id,
        riceVariety: 'Basmati',
        pricePerKg: 120,
        district: 'Kandy',
        historicalPrices: [
          { price: 115, timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          { price: 118, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }
        ]
      },
      {
        millId: createdMills[0]._id,
        riceVariety: 'White Rice',
        pricePerKg: 95,
        district: 'Kandy',
        historicalPrices: [
          { price: 90, timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
          { price: 92, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }
        ]
      }
    ];

    await Price.insertMany(prices);

    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Mill.deleteMany();
    await Price.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run function based on command
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}