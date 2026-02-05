// database/db.js
import { db } from "../config/Firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  setDoc,
  serverTimestamp,
  orderBy,
  limit
} from "firebase/firestore";

// Collection references
const moviesCollection = collection(db, "movies");
const theatersCollection = collection(db, "theaters");
const bookingsCollection = collection(db, "bookings");
const usersCollection = collection(db, "users");

// Save movie to Firestore (check for duplicates)
export const saveMoviesToDB = async (movies, theater) => {
  try {
    // Check if movies already exist for this theater
    const q = query(moviesCollection, where("theater", "==", theater));
    const existingMovies = await getDocs(q);
    const existingIds = existingMovies.docs.map(doc => doc.data().id);

    // Filter out duplicates
    const newMovies = movies.filter(movie => !existingIds.includes(movie.id));

    if (newMovies.length === 0) {
      console.log("No new movies to save for", theater);
      return;
    }

    // Save new movies
    const savePromises = newMovies.map(movie => 
      addDoc(moviesCollection, {
        ...movie,
        theater,
        savedAt: serverTimestamp(),
        isActive: true
      })
    );

    await Promise.all(savePromises);
    console.log(`${newMovies.length} new movies saved for ${theater}`);
  } catch (error) {
    console.error("Error saving movies:", error);
  }
};

// Get featured movies
export const getFeaturedMovies = async (count = 8) => {
  try {
    const q = query(moviesCollection, orderBy("savedAt", "desc"), limit(count));
    const querySnapshot = await getDocs(q);
    
    const movies = [];
    querySnapshot.forEach((doc) => {
      movies.push({ firebaseId: doc.id, ...doc.data() });
    });
    
    return movies;
  } catch (error) {
    console.error("Error getting featured movies:", error);
    return [];
  }
};

// Get movies by theater
export const getMoviesByTheater = async (theaterName) => {
  try {
    const q = query(
      moviesCollection, 
      where("theater", "==", theaterName),
      where("isActive", "==", true)
    );
    const querySnapshot = await getDocs(q);
    
    const movies = [];
    querySnapshot.forEach((doc) => {
      movies.push({ firebaseId: doc.id, ...doc.data() });
    });
    
    return movies;
  } catch (error) {
    console.error("Error getting movies by theater:", error);
    return [];
  }
};

// Book a ticket
export const bookTicket = async (bookingData) => {
  try {
    const bookingRef = await addDoc(bookingsCollection, {
      ...bookingData,
      status: "confirmed",
      bookedAt: serverTimestamp(),
      bookingId: `BK${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      paymentStatus: "pending"
    });
    
    return { 
      success: true, 
      bookingId: bookingRef.id,
      bookingNumber: bookingData.bookingId
    };
  } catch (error) {
    console.error("Error booking ticket:", error);
    return { success: false, error: error.message };
  }
};

// Add user to Firestore
export const addUserToDB = async (user) => {
  try {
    const userRef = doc(usersCollection, user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      photoURL: user.photoURL || "",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      role: "user"
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error("Error adding user to DB:", error);
    return { success: false, error: error.message };
  }
};

// Get user bookings
export const getUserBookings = async (userId) => {
  try {
    const q = query(
      bookingsCollection, 
      where("userId", "==", userId),
      orderBy("bookedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    
    return bookings;
  } catch (error) {
    console.error("Error getting user bookings:", error);
    return [];
  }
};

// Search movies
export const searchMovies = async (searchTerm) => {
  try {
    // Note: Firestore doesn't support native text search
    // This is a basic implementation - consider using Algolia for better search
    const querySnapshot = await getDocs(moviesCollection);
    const movies = [];
    
    querySnapshot.forEach((doc) => {
      const movie = doc.data();
      const searchableText = `${movie.title} ${movie.overview || ""}`.toLowerCase();
      
      if (searchableText.includes(searchTerm.toLowerCase())) {
        movies.push({ firebaseId: doc.id, ...movie });
      }
    });
    
    return movies.slice(0, 10); // Limit to 10 results
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// Update movie rating
export const updateMovieRating = async (movieId, newRating) => {
  try {
    const movieRef = doc(moviesCollection, movieId);
    await setDoc(movieRef, {
      userRating: newRating,
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error("Error updating movie rating:", error);
    return { success: false, error: error.message };
  }
};