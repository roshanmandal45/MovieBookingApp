import { useEffect, useState } from "react";
import { Tab, Transition } from "@headlessui/react";

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Genre list (you can fetch dynamically too)
const genresList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
];

const showTimes = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];

const Genre = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch movies for genre
  const fetchMovies = async (genreId) => {
    setLoading(true);
    try {
      // Currently showing (popular movies of that genre)
      const resCurrent = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreId}&language=en-US&page=1`
      );
      const dataCurrent = await resCurrent.json();
      setCurrentMovies(dataCurrent.results?.slice(0, 6) || []);

      // Upcoming movies
      const resUpcoming = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}&language=en-US&page=1`
      );
      const dataUpcoming = await resUpcoming.json();
      // Filter by genre
      const upcomingOfGenre = dataUpcoming.results?.filter((m) =>
        m.genre_ids.includes(genreId)
      );
      setUpcomingMovies(upcomingOfGenre?.slice(0, 6) || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchMovies(genre.id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Explore Genres 🎬
      </h1>

      {/* Genres grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {genresList.map((genre) => (
          <div
            key={genre.id}
            onClick={() => handleGenreClick(genre)}
            className="cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold p-4 rounded-lg shadow-md text-center transition transform hover:scale-105"
          >
            {genre.name}
          </div>
        ))}
      </div>

      {/* Sub-tabs for selected genre */}
      {selectedGenre && (
        <div className="max-w-6xl mx-auto">
          <Tab.Group>
            <Tab.List className="flex space-x-4 mb-4 justify-center">
              {["Currently Showing", "Upcoming"].map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    `px-4 py-2 rounded-lg font-semibold transition ${
                      selected
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              {/* Currently Showing */}
              <Tab.Panel>
                {loading ? (
                  <p className="text-center text-purple-700 font-bold mt-10">
                    Loading...
                  </p>
                ) : (
                  <Transition
                    show={!loading}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentMovies.map((movie) => (
                        <div
                          key={movie.id}
                          className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
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
                        </div>
                      ))}
                    </div>
                  </Transition>
                )}
              </Tab.Panel>

              {/* Upcoming */}
              <Tab.Panel>
                {loading ? (
                  <p className="text-center text-purple-700 font-bold mt-10">
                    Loading...
                  </p>
                ) : (
                  <Transition
                    show={!loading}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingMovies.map((movie) => (
                        <div
                          key={movie.id}
                          className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
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
                        </div>
                      ))}
                    </div>
                  </Transition>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </div>
  );
};

export default Genre;
