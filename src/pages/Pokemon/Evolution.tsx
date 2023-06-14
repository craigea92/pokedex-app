import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPokemonData } from "../../app/reducers/getPokemonData";
import PokemonCardGrid from "../../components/PokemonCardGrid";

function Evolution() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );

  useEffect(() => {
    const fetchData = async () => {
      // Extracting the array of Pokemon from the currentPokemon's evolution property
      const pokemons = currentPokemon?.evolution.map(({ pokemon }) => pokemon);
      // Fetching Pokemon data for the extracted array of Pokemon
      await dispatch(getPokemonData(pokemons!));
      // Setting the isLoaded state to true
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch, currentPokemon]);

  return (
    <div className="page">
      {isLoaded && <PokemonCardGrid pokemons={randomPokemons!} />}
    </div>
  );
}

export default Evolution;
