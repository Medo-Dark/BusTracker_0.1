import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locationReducer";
import { userSlice } from "./slices/userSlice";
export const store = configureStore({
    reducer:{
        loc: locationReducer,
        user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
})














