import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider,signInWithPopup  } from "../config/Firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email login:", { email, password });
    // You can implement Firebase email/password login here if needed
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google login success:", result.user);
      navigate("/movies"); // redirect after login
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-600 mb-8">Welcome back to Movie Booking</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Or continue with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Continue with Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
