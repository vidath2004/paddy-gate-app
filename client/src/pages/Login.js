import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login, reset } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      if (user.role === 'Farmer') {
        navigate('/farmer/dashboard');
      } else if (user.role === 'Miller') {
        navigate('/miller/dashboard');
      } else if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded-lg p-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full btn btn-primary py-2 px-4"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;