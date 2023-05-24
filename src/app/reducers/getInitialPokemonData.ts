import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonsRoute } from "../../utils/Constants";
import axios from "axios";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      const { data } = await axios.get(pokemonsRoute);
      return data.results;
    } catch (err) {
      console.log(err);
    }
  }
);

/*
The getInitialPokemonData function makes an API call using axios.get to fetch data from the pokemonsRoute URL, and it returns the data.results from the API response. 
*/