import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/Types";

const initialState: AppTypeInitialState = {};

export const AppSlice = createSlice({
  name:"app",
  initialState,
  reducers: {},
})

export const {} = AppSlice.actions;