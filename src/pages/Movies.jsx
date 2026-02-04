import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Vite
const IMAGE = "https://image.tmdb.org/t/p/w500";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: { api_key: API_KEY, page },
      })
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error("Failed to fetch movies:", err));
  }, [page]);

  return (
    <div className="bg-slate-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl mb-6 text-center">Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative cursor-pointer group rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={IMAGE + movie.poster_path}
              alt={movie.title}
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => navigate(`/movies/${movie.id}`)}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-white transition transform hover:scale-105"
              >
                View Details
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center text-sm font-semibold line-clamp-2">
              {movie.title}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-white text-lg">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
