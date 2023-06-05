import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  pokemonStatsType,
  pokemonTypeInterface,
  userPokemonsType,
} from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { addDoc } from "@firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { getUserPokemons } from "./getUserPokemons";

export const addPokemonToList = createAsyncThunk(
  "pokemon/addPokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: pokemonTypeInterface[] | string[];
      stats?: pokemonStatsType[];
    },
    { getState, dispatch }
  ) => {
    try {
      // Destructuring state variables from the RootState
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState;

      // Checking if the user is logged in
      if (!userInfo?.email) {
        // Dispatching a toast message if the user is not logged in
        return dispatch(
          setToast("Please login to add Pokemon to your collection")
        );
      }

      // Finding the index of the Pokemon in the user's collection
      const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
        return userPokemon.name === pokemon.name;
      });

      // If the Pokemon is not already in the user's collection
      if (index === -1) {
        let types: string[] = [];

        // Checking if the Pokemon has stats information
        if (!pokemon.stats) {
          // Extracting types from the Pokemon object
          pokemon.types.forEach((type: any) =>
            types.push(Object.keys(type).toString())
          );
        } else {
          types = pokemon.types as string[];
        }

        // Adding the Pokemon to the database
        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
        });

        // Dispatching an action to get the updated user's Pokemon collection
        await dispatch(getUserPokemons());

        // Dispatching a toast message to indicate that the Pokemon has been added
        return dispatch(
          setToast(`${pokemon.name} has been added to your collection`)
        );
      } else {
        // Dispatching a toast message if the Pokemon is already in the user's collection
        return dispatch(
          setToast(`${pokemon.name} is already in your collection`)
        );
      }
    } catch (err) {
      // Logging any errors that occur during the process
      console.log(err);
    }
  }
);
