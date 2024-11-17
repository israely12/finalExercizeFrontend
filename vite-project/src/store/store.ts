import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../store/features/usersSlice/usersSlice";
import candidatesReducer from "./features/candidatesSlice/candidayesSlice";

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
