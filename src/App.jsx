import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MovieDashboard from "./pages/MovieDashboard";
import Users from "./pages/Users";
import Genre from "./pages/Genre";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/moviesdashboard" element={<MovieDashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}
