import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { saveMoviesToDB } from "../database/db";

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Nepali theaters in Kathmandu
const theaters = ["QFX Cinema", "Big Movies", "Cityplex", "CineMax", "ScreenX"];
const showTimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheater, setSelectedTheater] = useState(theaters[0]);
  const [theaterMovies, setTheaterMovies] = useState([]);

  // Function to generate 2 common + 2 unique movies per theater
  const getMoviesForTheater = (allMovies, theater) => {
    if (!allMovies || allMovies.length < 4) return allMovies;
    const common = allMovies.slice(0, 2); // first 2 common
    const startIndex = theaters.indexOf(theater) % (allMovies.length - 2);
    const unique = allMovies.slice(startIndex, startIndex + 2); // 2 unique per theater
    return [...common, ...unique];
  };

  // Fetch movies from TMDB
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        const topMovies = data.results ? data.results.slice(0, 10) : [];
        setMovies(topMovies);

        // Set initial theater movies
        const initialMovies = getMoviesForTheater(topMovies, theaters[0]);
        setTheaterMovies(initialMovies);

        // Save to Firestore (no duplicates)
        saveMoviesToDB(initialMovies, theaters[0]);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Handle theater change
  const handleTheaterChange = (theater) => {
    setSelectedTheater(theater);
    const filteredMovies = getMoviesForTheater(movies, theater);
    setTheaterMovies(filteredMovies);

    // Save displayed movies to DB (no duplicates)
    saveMoviesToDB(filteredMovies, theater);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-purple-700 text-xl font-bold">Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-700 text-center">
        Now Showing in Kathmandu 🎬
      </h1>

      {/* Theater Selection */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {theaters.map((theater, idx) => (
          <button
            key={idx}
            onClick={() => handleTheaterChange(theater)}
            className={`px-4 py-2 rounded-lg shadow-md transition ${
              selectedTheater === theater
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {theater}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theaterMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg">{movie.title}</h2>
              <p className="text-gray-500">{movie.release_date}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {showTimes.map((time, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
