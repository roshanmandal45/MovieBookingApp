import React from 'react'
import { Search, Star, Clock, Users } from 'lucide-react';


export default function Home() {
  const featuredMovies = [
    { id: 1, title: 'The Dark Knight', rating: 9.0, image: 'https://via.placeholder.com/200x300?text=Dark+Knight', genre: 'Action' },
    { id: 2, title: 'Inception', rating: 8.8, image: 'https://via.placeholder.com/200x300?text=Inception', genre: 'Sci-Fi' },
    { id: 3, title: 'Interstellar', rating: 8.6, image: 'https://via.placeholder.com/200x300?text=Interstellar', genre: 'Sci-Fi' },
    { id: 4, title: 'The Matrix', rating: 8.7, image: 'https://via.placeholder.com/200x300?text=Matrix', genre: 'Sci-Fi' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://via.placeholder.com/1200x400?text=Movie+Banner)'}}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Book Your Movie</h1>
            <p className="text-xl mb-8">Experience cinema like never before</p>
            <div className="flex gap-2 bg-white rounded-lg p-2 w-96 mx-auto">
              <Search className="text-slate-400" size={24} />
              <input type="text" placeholder="Search movies..." className="flex-1 outline-none text-slate-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Movies */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Now Showing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMovies.map(movie => (
            <div key={movie.id} className="bg-slate-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition cursor-pointer">
              <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{movie.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 text-sm">{movie.rating}</span>
                </div>
                <p className="text-slate-300 text-sm mb-4">{movie.genre}</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-slate-700 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center text-white">
            <Clock size={40} className="mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-slate-300">Book your tickets in just a few clicks</p>
          </div>
          <div className="text-center text-white">
            <Users size={40} className="mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-bold mb-2">Group Discounts</h3>
            <p className="text-slate-300">Get special rates for group bookings</p>
          </div>
          <div className="text-center text-white">
            <Star size={40} className="mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-bold mb-2">Best Experience</h3>
            <p className="text-slate-300">Premium seats and sound quality</p>
          </div>
        </div>
      </div>
    </div>
  );
}