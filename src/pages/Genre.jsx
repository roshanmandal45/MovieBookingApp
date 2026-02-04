import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE = "https://image.tmdb.org/t/p/w500";

export default function GenresPage() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all genres from TMDB
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          { params: { api_key: API_KEY } }
        );
        setGenres(res.data.genres);
        setSelectedGenre(res.data.genres[0]); // default first genre
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies when a genre is selected
  useEffect(() => {
    if (!selectedGenre) return;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: API_KEY,
              with_genres: selectedGenre.id,
              sort_by: "popularity.desc",
              page: 1,
            },
          }
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenre]);

  if (!selectedGenre) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading genres...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Genres</h1>

      {/* Genre buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedGenre.id === genre.id
                ? "bg-red-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-200"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movies grid */}
      {loading ? (
        <div className="text-center text-white">Loading {selectedGenre.name} movies...</div>
      ) : (
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
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => navigate(`/movies/${movie.id}`)}
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-white transition transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
              {/* Movie title */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center text-sm font-semibold line-clamp-2">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
