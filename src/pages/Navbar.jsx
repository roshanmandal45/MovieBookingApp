import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 shadow-lg flex justify-between items-center px-10">
      <div>
      <Link to="/" className="text-white font-bold text-2xl">🎬 CineBooking</Link>

      </div>
<div>
  <ul className="flex space-x-6 text-white font-medium items-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movie</Link></li>
        <li><Link to="/genre">Genre</Link></li>
        <li><Link to="/about">About</Link></li>
        </ul>
</div>
<div className="flex justify-center items-center gap-x-2">

        {user ? (
          <>
            
              <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full"/>
              <span>{user.displayName}</span>
            
            <button onClick={handleLogout} className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-100">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-100">Login</Link>
            <Link to="/signup" className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-100">Sign Up</Link>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
