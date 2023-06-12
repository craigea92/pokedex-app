import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonsRoute } from "../../utils/Constants";
import axios from "axios";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      // Fetching initial Pokemon data from the specified route using axios
      const { data } = await axios.get(pokemonsRoute);

      // Returning the 'results' property from the fetched data
      return data.results;
    } catch (err) {
      // Logging any errors that occur during the process
      console.log(err);
    }
  }
);