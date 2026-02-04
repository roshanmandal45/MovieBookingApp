import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const showTimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);

        // Fetch videos for the movie
        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_KEY}&language=en-US`
        );
        const videoData = await videoRes.json();
        // Find the first YouTube trailer
        const youtubeTrailer = videoData.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setTrailerKey(youtubeTrailer?.key || null);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p className="text-center mt-10 text-purple-700 font-bold">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">{movie.title}</h1>

      {/* Trailer */}
      {trailerKey ? (
        <div className="flex justify-center mb-6">
          <iframe
            className="w-full max-w-4xl h-96 rounded shadow-lg"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title={movie.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-6">Trailer not available</p>
      )}

      {/* Showtimes */}
      <div className="bg-white p-4 rounded shadow-lg mb-6 max-w-4xl mx-auto">
        <h2 className="font-semibold mb-2 text-purple-700">Showtimes:</h2>
        <div className="flex flex-wrap gap-2">
          {showTimes.map((time, idx) => (
            <span
              key={idx}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded shadow-sm"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-3 text-purple-700">Description:</h2>
        <p className="text-gray-700">{movie.overview || "No description available."}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
