import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { deleteDoc, doc } from "@firebase/firestore";

export const removePokemonFromUserList = createAsyncThunk(
  "pokemon/remove",
  async ({ id }: { id: string }) => {
    try {
      // Deleting the Pokemon document from Firestore based on the provided id
      await deleteDoc(doc(pokemonListRef, id));

      // Returning the id of the removed Pokemon
      return { id };
    } catch (err) {
      // Logging any errors that occur during the process
      console.log(err);
    }
  }
);
