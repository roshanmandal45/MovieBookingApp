// db.js
// import { db } from "../database/db";
import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Save a movie to Firestore if it doesn't exist already
 * movie = {id, title, poster_path, release_date, overview, theater}
 */
export const saveMovieToDB = async (movie) => {
  try {
    const docId = movie.theater ? `${movie.id}_${movie.theater}` : movie.id.toString();
    const docRef = doc(db, "movies", docId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(`Movie already exists: ${movie.title} (${movie.theater || "No Theater"})`);
      return; // skip duplicates
    }

    await setDoc(docRef, {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path || "",
      release_date: movie.release_date || "",
      overview: movie.overview || "",
      theater: movie.theater || null,
    });

    console.log(`Saved movie: ${movie.title} (${movie.theater || "No Theater"})`);
  } catch (err) {
    console.error("Error saving movie to DB:", err);
  }
};

/**
 * Save multiple movies
 */
export const saveMoviesToDB = async (movies, theater) => {
  for (const movie of movies) {
    await saveMovieToDB({ ...movie, theater });
  }
};
