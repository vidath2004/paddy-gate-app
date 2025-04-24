const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Make sure to export the app from server.js

let token;
let userId;
let millId;

// Before all tests, connect to the database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// After all tests, disconnect from the database
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'Farmer',
        profile: {
          name: 'Test User',
          contact: {
            phone: '1234567890'
          },
          location: {
            district: 'Test District'
          }
        }
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    userId = res.body._id;
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });
});

describe('Mills API', () => {
  it('should create a new mill', async () => {
    const res = await request(app)
      .post('/api/mills')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Mill',
        location: {
          district: 'Test District',
          address: 'Test Address'
        },
        contactInfo: {
          phone: '1234567890',
          email: 'mill@example.com'
        },
        specializations: ['Basmati', 'White Rice']
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    millId = res.body._id;
  });

  it('should get all mills', async () => {
    const res = await request(app)
      .get('/api/mills');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe('Prices API', () => {
  it('should update a price', async () => {
    const res = await request(app)
      .post('/api/prices')
      .set('Authorization', `Bearer ${token}`)
      .send({
        millId,
        riceVariety: 'Basmati',
        pricePerKg: 100,
        district: 'Test District'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all prices', async () => {
    const res = await request(app)
      .get('/api/prices');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});