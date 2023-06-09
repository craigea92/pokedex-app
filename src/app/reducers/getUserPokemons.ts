import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDocs, query, where } from "@firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { userPokemonsType } from "../../utils/Types";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/getPokemonTypes";

export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }) => {
    try {
      // Destructuring the userInfo from the RootState
      const {
        app: { userInfo },
      } = getState() as RootState;

      // Checking if the user is logged in
      if (!userInfo?.email) {
        return;
      }

      // Creating a Firestore query to fetch user-specific Pokemon data
      const firestoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo?.email)
      );

      // Fetching the user's Pokemon data from Firestore
      const fetchedPokemons = await getDocs(firestoreQuery);

      // If the user has fetched Pokemons
      if (fetchedPokemons.docs.length) {
        const userPokemons: userPokemonsType[] = [];

        // Looping through the fetched Pokemons
        fetchedPokemons.forEach(async (pokemon) => {
          // Extracting the Pokemon data from the Firestore document
          const pokemons = await pokemon.data().pokemon;

          // Fetching the corresponding image for the Pokemon
          // @ts-ignore
          let image = images[pokemons.id];
          if (!image) {
            // @ts-ignore
            image = defaultImages[pokemons.id];
          }

          // Mapping the types of the Pokemon to an array of type objects
          const types = pokemons.types.map((name: string) => ({
            // @ts-ignore
            [name]: pokemonTypes[name],
          }));

          // Adding the Pokemon data to the userPokemons array
          userPokemons.push({
            ...pokemons,
            firebaseId: pokemon.id,
            image,
            types,
          });
        });

        // Returning the user's Pokemon data
        return userPokemons;
      }

      // If the user has no fetched Pokemons, return an empty array
      return [];
    } catch (err) {
      // Logging any errors that occur during the process
      console.log(err);
    }
  }
);
