import React from "react";
import Wrapper from "../sections/Wrapper";
import Login from "../components/Login";
import { useAppSelector } from "../app/hooks";
import PokemonCardGrid from "../components/PokemonCardGrid";

function MyList() {
  const { userInfo } = useAppSelector(({ app }) => app);
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
  return (
    <div className="list">
      {userInfo ? <PokemonCardGrid pokemons={userPokemons} /> : <Login />}
    </div>
  );
}

export default Wrapper(MyList);
