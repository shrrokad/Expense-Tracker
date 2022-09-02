import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import middelwareapi from "./Reducer/middelware/middelwareapi";
import combineData from "./Reducer/combinereducer";

export const store = configureStore({

    reducer: combineData,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(middelwareapi)
})