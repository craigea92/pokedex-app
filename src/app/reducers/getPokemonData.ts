import { createAsyncThunk } from "@reduxjs/toolkit";
import { generatedPokemonType, genericPokemonType } from "../../utils/Types";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/getPokemonTypes";
import axios from "axios";

export const getPokemonData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: genericPokemonType[]) => {
    try {
      // An array to store the fetched Pokemon data
      const pokemonsData: generatedPokemonType[] = [];

      // Looping through each Pokemon in the input array
      for await (const pokemon of pokemons) {
        // Fetching data for each Pokemon from the provided URL using axios
        const {
          data,
        }: {
          data: {
            id: number;
            types: { type: generatedPokemonType }[];
          };
        } = await axios.get(pokemon.url);

        // Extracting types information for the Pokemon
        const types = data.types.map(
          ({ type: { name } }: { type: { name: string } }) => ({
            // @ts-expect-error
            [name]: pokemonTypes[name],
          })
        );

        // Fetching the corresponding image for the Pokemon
        // @ts-expect-error
        let image: string = images[data.id];
        if (!image) {
          // @ts-expect-error
          image = defaultImages[images.id];
        }

        // Adding the Pokemon's data to the pokemonsData array if an image is found
        if (image) {
          pokemonsData.push({
            name: pokemon.name,
            id: data.id,
            image,
            types,
          });
        }
      }

      // Returning the fetched Pokemon data
      return pokemonsData;
    } catch (err) {
      // Logging any errors that occur during the process
      console.log(err);
    }
  }
);
