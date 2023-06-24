import React from "react";
import { useAppSelector } from "../../app/hooks";

function CapableMoves() {
  // Extracting the currentPokemon data from the pokemon state using the useAppSelector hook
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <div className="capable-moves">
      <h1 className="capable-move-title">Abilities</h1>
      <ul className="capable-moves-list ability">

        {pokemonData?.pokemonAbilities.abilities.map((ability:string)=> (
          <li key={ability} className="pokemon-location">
            {ability}
          </li>
        ))}
      </ul>
      <h1 className="capable-move-title">Moves</h1>
      <ul className="capable-moves-list ability">

        {pokemonData?.pokemonAbilities.moves.map((move:string)=> (
          <li key={move} className="pokemon-location">
            {move}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CapableMoves;
