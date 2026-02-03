import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
              <User size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full outline-none text-gray-800"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full outline-none text-gray-800"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full outline-none text-gray-800"
                required
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full outline-none text-gray-800"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}