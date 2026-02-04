import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-purple-700">Login</h2>

        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 rounded" 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 rounded" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Login</button>
        <button type="button" onClick={handleGoogle} className="bg-red-500 text-white py-2 rounded hover:bg-red-600">Sign in with Google</button>
      </form>
    </div>
  );
};

export default Login;
