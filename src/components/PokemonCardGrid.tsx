import React from "react";

function PokemonCardGrid({ pokemons }: any) {
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: any) => {
            return (
              <div className="pokemon-card" key="{data.id}">
                Hello
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;
