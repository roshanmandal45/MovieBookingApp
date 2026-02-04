import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Star, Calendar, Clock } from "lucide-react";

const API_KEY = "80d491707d8cf7b38aa19c7ccab0952f";
const IMAGE = "https://image.tmdb.org/t/p/original";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: { api_key: API_KEY },
      })
      .then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${IMAGE}${movie.backdrop_path})`,
      }}
    >
      {/* Dark overlay */}
      <div className="min-h-screen bg-black/80 flex items-center justify-center px-4">
        <div className="max-w-3xl text-center text-white">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-gray-300 hover:text-white transition"
          >
            ← Back
          </button>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {movie.title}
          </h1>

          {/* Meta info */}
          <div className="flex justify-center gap-6 text-gray-300 text-sm mb-6">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
              {movie.vote_average.toFixed(1)}
            </div>

            {movie.release_date && (
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                {movie.release_date}
              </div>
            )}

            <div className="flex items-center gap-1">
              <Clock size={16} />
              {movie.original_language.toUpperCase()}
            </div>
          </div>

          {/* Overview */}
          <p className="text-gray-200 text-lg leading-relaxed px-4 md:px-12 mb-10">
            {movie.overview || "No description available for this movie."}
          </p>

          {/* Book Now Button */}
          <button
            onClick={() => alert("Booking coming soon 🎟️")}
            className="px-10 py-3 bg-red-600 hover:bg-red-700 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg"
          >
            🎟 Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
