import React from "react";
import { useAppSelector } from "../../app/hooks";
import PokemonContainer from "../../components/PokemonContainer";
import Info from "../../components/Info";

function Description() {
  // Extracting the currentPokemon data from the pokemon state using the useAppSelector hook
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <div>
      {pokemonData && (
        <>
          <Info data={pokemonData} />
          <PokemonContainer image={pokemonData?.image!} />
        </>
      )}
    </div>
  );
}

export default Description;
