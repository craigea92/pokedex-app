import React from "react";
import { useAppSelector } from "../../app/hooks";

function Location() {
  // Extracting the currentPokemon data from the pokemon state using the useAppSelector hook
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <div className="pokemon-locations">
      <ul className="pokemon-locations-list">
        {pokemonData?.encounters.map((encounter:string)=> (
          <li key={encounter} className="pokemon-location">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Location;
