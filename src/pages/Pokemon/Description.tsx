import React from "react";
import { useAppSelector } from "../../app/hooks";
import PokemonContainer from "../../components/PokemonContainer";

function Description() {
  // Extracting the currentPokemon data from the pokemon state using the useAppSelector hook
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <div>
      <PokemonContainer image={pokemonData?.image}/>
    </div>
  );
}

export default Description;
