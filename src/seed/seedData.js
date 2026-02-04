// seedData.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, setDoc } from "firebase/firestore";

// Firebase config (same as .env)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Your Data ---
const MOVIES = [
  { id: "movie_1", title: "Inception", genre: ["Sci-Fi","Thriller"], rating: 8.8, synopsis:"A thief enters dream worlds...", duration:148, status:"now_showing" },
  { id: "movie_2", title: "The Dark Knight", genre:["Action","Drama"], rating: 9.0, synopsis:"Batman raises the stakes...", duration:152, status:"now_showing" },
  { id: "movie_3", title: "Interstellar", genre:["Sci-Fi","Adventure"], rating: 8.6, synopsis:"A journey through spacetime...", duration:169, status:"coming_soon" }
];

const THEATRES = [
  { id:"theatre_1", name:"Grand Cinema", location:"Downtown" },
  { id:"theatre_2", name:"City Plex", location:"Mall Road" }
];

const SHOWTIMES = [
  { id:"show_1", movieId:"movie_1", theatreId:"theatre_1", time:"10:30" },
  { id:"show_2", movieId:"movie_1", theatreId:"theatre_2", time:"18:30" },
  { id:"show_3", movieId:"movie_2", theatreId:"theatre_1", time:"20:00" }
];

// Generate seats
function generateSeats(showId) {
  const rows = ['A','B','C','D','E','F'];
  const seats = [];
  rows.forEach(r => {
    for(let i=1;i<=10;i++){
      seats.push({
        id:`${showId}_${r}${i}`,
        showId,
        seatID:`${r}${i}`,
        status:"available",
        type:(r==='A'||r==='B')?"VIP":"Regular"
      });
    }
  });
  return seats;
}

// Seed Firestore
async function seedFirestore() {
  try {
    const movieRef = collection(db,"movies");
    const existingMovies = await getDocs(movieRef);
    if(!existingMovies.empty){ console.log("Movies already seeded"); return; }

    // Movies
    for(const m of MOVIES){
      await setDoc(doc(db,"movies",m.id), m);
    }
    console.log("Movies seeded");

    // Theatres
    for(const t of THEATRES){
      await setDoc(doc(db,"theatres",t.id), t);
    }
    console.log("Theatres seeded");

    // Showtimes
    for(const s of SHOWTIMES){
      await setDoc(doc(db,"showtimes",s.id), s);

      // Seats for each show
      const seats = generateSeats(s.id);
      for(const seat of seats){
        await setDoc(doc(db,"seats",seat.id), seat);
      }
    }
    console.log("Showtimes and seats seeded successfully");

  } catch(err){
    console.error("Seeding failed:", err);
  }
}

seedFirestore();
