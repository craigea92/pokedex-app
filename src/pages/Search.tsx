import React, { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData";
import { getPokemonData } from "../app/reducers/getPokemonData";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { debounce } from "../utils/Debounce";

function Search() {
  // Getting the dispatch function using the useAppDispatch hook
  const dispatch = useAppDispatch();
  // Extracting the allPokemon and randomPokemons data from the pokemon state using the useAppSelector hook
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );
  useEffect(() => {
    // Dispatching the getInitialPokemonData action when the component mounts
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      // Cloning the allPokemon array
      const clonedPokemons = [...allPokemon];
      // Randomly selecting 50 pokemon IDs from the clonedPokemons array
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 50);
      // Dispatching the getPokemonData action with the randomly selected pokemon IDs
      dispatch(getPokemonData(randomPokemonsId));
    }
  }, [allPokemon, dispatch]);

  // Function to get pokemon data based on search value
  const getPokemon = async (value: string) => {
    if (value.length) {
      // Filtering the allPokemon array based on the search value
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      // Dispatching the getPokemonData action with the filtered pokemons
      dispatch(getPokemonData(pokemons!));
    } else {
      const clonedPokemons = [...(allPokemon as [])];
      // Randomly selecting 50 pokemon IDs from the clonedPokemons array
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 50);
      // Dispatching the getPokemonData action with the randomly selected pokemon IDs
      dispatch(getPokemonData(randomPokemonsId));
    }
  };
  
  // Debounced function to handle search input change
  const handleChange = debounce((value: string) => getPokemon(value), 300);

  return (
    <>
      <div className="search">
        <input
          type="text"
          className="pokemon-searchbar"
          placeholder="Search Pokemon"
          onChange={(input) => handleChange(input.target.value)}
        />
        <PokemonCardGrid pokemons={randomPokemons!} />
      </div>
    </>
  );
}

export default Wrapper(Search);
