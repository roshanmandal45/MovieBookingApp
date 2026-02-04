import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider,signInWithPopup  } from "../config/Firebase";

import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen to Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login"); // redirect to login after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 md:px-20 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
      {/* Logo */}
      <div>
        <h1 className="text-white font-bold text-lg cursor-pointer">
          <Link to="/">MovieBooking</Link>
        </h1>
      </div>

      {/* Links */}
      <div className="flex gap-x-6 md:gap-x-10">
        <Link to="/" className="text-white hover:text-gray-200 transition">
          Home
        </Link>
        <Link to="/movies" className="text-white hover:text-gray-200 transition">
          Movies
        </Link>
        <Link to="/genres" className="text-white hover:text-gray-200 transition">
          Genres
        </Link>
        <Link to="/about" className="text-white hover:text-gray-200 transition">
          About
        </Link>
      </div>

      {/* Auth buttons / User profile */}
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="text-white hover:text-gray-200 transition">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-gray-200 transition">
              Signup
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            )}
            <span className="text-white font-semibold">
              {user.displayName ? user.displayName : user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
