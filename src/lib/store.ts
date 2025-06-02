import { configureStore } from "@reduxjs/toolkit";
import { boardApi } from "./features/board/boardApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [boardApi.reducerPath]: boardApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(boardApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
