import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-6xl mx-auto">
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Rice Market Marketplace and Pricing Platform
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connecting farmers and mills directly with transparent pricing and real-time updates.
            </p>
            {!user ? (
              <div className="space-x-4">
                <Link to="/register" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
              </div>
            ) : (
              <Link to={user.role === 'Farmer' ? '/farmer/dashboard' : 
                         user.role === 'Miller' ? '/miller/dashboard' : 
                         '/admin/dashboard'} 
                    className="btn btn-primary">
                Go to Dashboard
              </Link>
            )}
          </div>
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Rice Farmer"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Key Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary-600 text-4xl mb-4">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Price Updates</h3>
            <p className="text-gray-600">Access the latest rice prices from mills across Sri Lanka updated in real-time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary-600 text-4xl mb-4">
              <i className="fas fa-calculator"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Profit Calculator</h3>
            <p className="text-gray-600">Estimate your potential earnings based on current market prices and your harvest volume.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary-600 text-4xl mb-4">
              <i className="fas fa-handshake"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
            <p className="text-gray-600">Connect directly with farmers or mills without intermediaries.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full text-2xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Register as a Farmer or Mill</h3>
            <p className="text-gray-600">Create your account and complete your profile with relevant details.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full text-2xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Access Market Information</h3>
            <p className="text-gray-600">View current prices, trends, and market analytics in your dashboard.</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full text-2xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Connect and Trade</h3>
            <p className="text-gray-600">Contact potential buyers or sellers and finalize your transactions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;