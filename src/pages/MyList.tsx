import React, { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import Login from "../components/Login";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { getUserPokemons } from "../app/reducers/getUserPokemons";

function MyList() {
  // Extracting the userInfo data from the app state using the useAppSelector hook
  const { userInfo } = useAppSelector(({ app }) => app);
  // Extracting the userPokemons data from the pokemon state using the useAppSelector hook
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
  // Getting the dispatch function using the useAppDispatch hook
  const dispatch = useAppDispatch();
  useEffect(()=> {
    // Dispatching the getUserPokemons action when the userInfo or dispatch dependencies change
    dispatch(getUserPokemons());
  }, [userInfo, dispatch]);
  return (
    <div className="list">
      {userInfo ? <PokemonCardGrid pokemons={userPokemons} /> : <Login />}
    </div>
  );
}

export default Wrapper(MyList);
