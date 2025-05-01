import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        email,
        password,
      });
  
      // Check for 200 OK response before processing
      if (response.status === 200 && response.data) {
        localStorage.setItem("token", response.data);
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1500,
          onClose: () => navigate("/post"),
        });
      }
    } catch (err) {
      setError("Invalid credentials or server error");
      toast.error("Invalid credentials or server error", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Login failed:", err);
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
      <div className="flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full backdrop-blur-xl bg-white/5 border border-slate-700">

        {/* Left Image Slide */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://moxienola.com/wp-content/uploads/2021/07/eLearning-Graphic-scaled.jpg"
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Login Form */}
        <div className="md:w-1/2 w-full p-8 md:p-12">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400 text-sm mt-1">Login to your portal</p>
          </div>

          <form onSubmit={handleLogin}>
            {error && <p className="text-red-400 mb-4 text-sm text-center">{error}</p>}

            <div className="mb-4">
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6 text-sm text-slate-400">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded bg-slate-700 border-slate-600" />
                Remember me
              </label>
              <a href="/register" className="text-indigo-400 hover:underline">
                Don't Have Account?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition duration-200 shadow-md"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      <ToastContainer theme="dark" transition={Slide} />
    </div>
  );
};

export default Login;
