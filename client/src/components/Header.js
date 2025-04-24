import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    // Navigate first, then logout
    navigate('/');
    // Add a small delay before dispatching actions
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
    <header className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            Paddy Gate
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to={getDashboardLink()} className="hover:text-gray-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button 
                    className="hover:text-gray-200"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-200">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-200">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;