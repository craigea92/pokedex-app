import React from "react";
import { useAppSelector } from "../../app/hooks";

function Location() {
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
