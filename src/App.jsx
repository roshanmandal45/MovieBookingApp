import {Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import Footer from "./pages/Footer";
import Genre from "./pages/Genre";

function App() {
  return (
   <div>

  
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/genre" element={<Genre />} />

      </Routes>
      <Footer/>
       </div>
  );
}

export default App;
