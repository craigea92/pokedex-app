import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAADuVAMTm4Dl_sECyv5PHab2-pgs0wI1U",
  authDomain: "pokedex-pokeapi-86233.firebaseapp.com",
  projectId: "pokedex-pokeapi-86233",
  storageBucket: "pokedex-pokeapi-86233.appspot.com",
  messagingSenderId: "344100434434",
  appId: "1:344100434434:web:82e25d2f07457df84d2d1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
