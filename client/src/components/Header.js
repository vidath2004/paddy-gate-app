import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiBarChart2 } from 'react-icons/fi';
import paddyGateLogo from '../assets/images/background/paddy-gate-logo-white.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    navigate('/');
    setTimeout(() => {
      dispatch(logout());
      dispatch(reset());
    }, 50);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch(user?.role) {
      case 'Farmer':
        return '/farmer/dashboard';
      case 'Miller':
        return '/miller/dashboard';
      case 'Admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <header 
      className={`bg-white shadow-md relative z-30 transition-colors duration-300 ${isHovered ? 'bg-gray-50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={paddyGateLogo} 
                alt="Paddy Gate" 
                className="h-10 w-10 mr-3 transition-transform duration-300 hover:scale-110" 
              />
              <span className="text-2xl font-bold text-primary-700 hidden sm:inline-block transition-colors duration-300 hover:text-primary-800">
                Paddy Gate
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition duration-200 hover:bg-gray-100 px-2 py-1 rounded-md"
                >
                  <FiHome className="mr-1" />
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link 
                      to={getDashboardLink()} 
                      className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition duration-200 hover:bg-gray-100 px-2 py-1 rounded-md"
                    >
                      <FiBarChart2 className="mr-1" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <div className="border-l border-gray-300 h-6 mx-2"></div>
                  </li>
                  <li className="relative group">
                    <button className="flex items-center text-gray-700 font-medium group-hover:text-primary-600 hover:bg-gray-100 px-2 py-1 rounded-md">
                      <FiUser className="mr-1" />
                      <span>{user?.profile?.name || 'Account'}</span>
                    </button>
                    <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg invisible group-hover:visible transition-all duration-200 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2">
                      <div className="py-2">
                        <button 
                          onClick={onLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <FiLogOut className="mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition duration-200 hover:bg-gray-100 px-2 py-1 rounded-md"
                    >
                      <FiUser className="mr-1" />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium transition duration-200 transform hover:scale-105"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <ul className="py-3 px-4 space-y-3">
            <li>
              <Link 
                to="/" 
                className="block text-gray-700 font-medium hover:bg-gray-100 px-2 py-1 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link 
                    to={getDashboardLink()} 
                    className="block text-gray-700 font-medium hover:bg-gray-100 px-2 py-1 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout();
                    }}
                    className="block text-gray-700 font-medium hover:bg-gray-100 w-full text-left px-2 py-1 rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="block text-gray-700 font-medium hover:bg-gray-100 px-2 py-1 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="block bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;