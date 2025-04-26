import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/api/auth/register', {
        username,
        email,
        password,
      });

      toast.success('Registration successful!', {
        position: "top-center",
        autoClose: 1500,
        onClose: () => navigate("/"),
      });
    } catch (err) {
      setError(err.response ? err.response.data : 'Registration failed');
      toast.error(err.response ? err.response.data : 'Registration failed', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">

        {/* Form Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 text-sm mt-1">Please fill in your details to register</p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="john_doe"
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Toast Container */}
        <ToastContainer theme="dark" />
      </div>
    </div>
  );
};

export default Register;
