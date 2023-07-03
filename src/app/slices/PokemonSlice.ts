import { createSlice } from "@reduxjs/toolkit";
import {
  PokemonTypeInitialState,
  generatedPokemonType,
} from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";
import { getUserPokemons } from "../reducers/getUserPokemons";
import { removePokemonFromUserList } from "../reducers/removePokemonFromUserList";

const initialState: PokemonTypeInitialState = {
  // Initial state object with undefined or empty values
  allPokemon: undefined,
  randomPokemons: undefined,
  compareQueue: [],
  userPokemons: [],
  currentPokemon: undefined,
};

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      // Find the index of the pokemon in the compareQueue array
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      if (index === -1) {
        // If the pokemon is not already in the compareQueue
        if (state.compareQueue.length === 2) {
          // If the compareQueue already has 2 pokemons, remove the last one
          state.compareQueue.pop();
        }
        // Add the new pokemon to the beginning of the compareQueue array
        state.compareQueue.unshift(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      // Find the index of the pokemon in the compareQueue array
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      // Create a new array (copy of compareQueue)
      const queue = [...state.compareQueue];
      // Remove the pokemon at the found index from the queue array
      queue.splice(index, 1);
      // Update the compareQueue with the modified queue array
      state.compareQueue = queue;
    },
    setCurrentPokemon: (state, action) => {
      // Update the currentPokemon with the payload value
      state.currentPokemon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      // Update allPokemon with the payload value
      state.allPokemon = action.payload;
    });
    builder.addCase(getPokemonData.fulfilled, (state, action) => {
      // Update randomPokemons with the payload value
      state.randomPokemons = action.payload;
    });
    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      // Update userPokemons with the payload value
      state.userPokemons = action.payload!;
    });
    builder.addCase(removePokemonFromUserList.fulfilled, (state, action) => {
      // Create a new array (copy of userPokemons)
      const userPokemon = [...state.userPokemons];
      // Find the index of the pokemon in the userPokemon array
      const index = userPokemon.findIndex(
        (pokemon) => pokemon.firebaseId === action.payload?.id
      );
      // Remove the pokemon at the found index from the userPokemon array
      userPokemon.splice(index, 1);
      // Update userPokemons with the modified userPokemon array
      state.userPokemons = userPokemon;
    });
  },
});

export const { addToCompare, removeFromCompare, setCurrentPokemon } =
  PokemonSlice.actions;
