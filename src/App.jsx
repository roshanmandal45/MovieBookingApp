import {Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import Footer from "./pages/Footer";
import Genre from "./pages/Genre";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
   <div>

  
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/genre" element={<Genre />} />

      </Routes>
      <Footer/>
       </div>
  );
}

export default App;
