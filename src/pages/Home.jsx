import { Star, MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const featuredMovies = [
    {
      id: 1,
      title: "Wuthering Heights",
      rating: 9.0,
      image: "https://www.movieposters.com/cdn/shop/files/wuthering-heights_x7r47qgo.jpg?v=1766422505&width=250",
      genre: "Action"
    },
    {
      id: 2,
      title: "Avengers Endgame",
      rating: 8.8,
      image: "https://imgs.search.brave.com/vRob72dhcsh8w977xQbHi1-Fi7xL6oTOL-zHl3O93aw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzBiLzE0/L2U0LzBiMTRlNGVl/ZTgxZmYyMTM5ZGI0/ZWI3Yzg2NTdkMGJl/LmpwZw",
      genre: "Sci-Fi"
    },
    {
      id: 3,
      title: "Interstellar",
      rating: 8.6,
      image: "https://imgs.search.brave.com/JzcDQtKHfJatTPFoHLADB94wZeDi43xj4-tUMIxshdE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXItbWFuaWEu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzA5L0hpZ2hf/cmVzb2x1dGlvbl93/YWxscGFwZXJfYmFj/a2dyb3VuZF9JRF83/NzcwMTEyMjEzNS5q/cGc",
      genre: "Drama"
    },
    {
      id: 4,
      title: "Parasite",
      rating: 8.5,
      image: "https://imgs.search.brave.com/Q5pm18kjJoeMM2KPui0b4AXbXvMZysNldsEIrZx-RKo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibHVy/YXlhdXRob3JpdHku/Y29tL2ltYWdlcy9j/b3Zlcl9hcnQvcGFy/YXNpdGV1aGQuanBn/OyUyMD8lM0U",
      genre: "Thriller"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=1200&fit=crop
"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">CineBook</h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">Book Your Movie Tickets Online</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Now Showing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMovies.map((movie) => (
              <div
                key={movie.id}
                className="group bg-slate-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:opacity-80 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition duration-300 flex items-center justify-center">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg">
                      Book Tickets
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-purple-300 text-sm mb-3">{movie.genre}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">{movie.rating}</span>
                    </div>
                    <span className="text-purple-300 text-xs">View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-slate-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-lg text-center hover:shadow-2xl transition duration-300">
              <MapPin size={48} className="mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold mb-4">Multiple Locations</h3>
              <p className="text-purple-100">Book tickets at 50+ cinemas across the country</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-lg text-center hover:shadow-2xl transition duration-300">
              <Clock size={48} className="mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold mb-4">Instant Booking</h3>
              <p className="text-purple-100">Get your tickets in seconds with no hassle</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-lg text-center hover:shadow-2xl transition duration-300">
              <Users size={48} className="mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold mb-4">Best Prices</h3>
              <p className="text-purple-100">Get the best deals and exclusive offers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-300 py-16 px-4 md:px-8 border-t border-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">CineBook</h3>
              <p className="text-sm text-gray-400">Your one-stop destination for movie tickets and entertainment.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-red-500 transition duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/movies" className="hover:text-red-500 transition duration-300">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to="/theaters" className="hover:text-red-500 transition duration-300">
                    Theaters
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="hover:text-red-500 transition duration-300">
                    Offers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:text-red-500 transition duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-red-500 transition duration-300">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-red-500 transition duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-red-500 transition duration-300">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition duration-300"
                >
                  f
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition duration-300"
                >
                  𝕏
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition duration-300"
                >
                  📷
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition duration-300"
                >
                  ▶
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 CineBook. All rights reserved. Designed with ❤️ for movie lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}