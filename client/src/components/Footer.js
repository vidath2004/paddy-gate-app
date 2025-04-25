// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import paddyGateLogo from '../assets/images/background/paddy-gate-logo-white.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
            <img 
                src={paddyGateLogo} 
                alt="Paddy Gate" 
                className="h-10 w-10 mr-3 transition-transform duration-300 hover:scale-110" 
              />
              <span className="text-2xl font-bold">Paddy Gate</span>
            </div>
            <p className="text-gray-400 mb-6">
              Bridging farmers and mills through transparent rice pricing and direct communication.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-300">Login</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors duration-300">Register</Link></li>
            </ul>
          </div>
          
        
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-primary-400" />
                <span className="text-gray-400">Department of IT, University of Moratuwa, Katubedda, Moratuwa</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-primary-400" />
                <span className="text-gray-400">+94 123 456 789</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-primary-400" />
                <span className="text-gray-400">info@paddygate.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Paddy Gate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;