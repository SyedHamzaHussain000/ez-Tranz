import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authReducer from "./authSlice";
import languageReducer from './languageSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["data"],
  blacklist: [],
};

const rootReducer = combineReducers({
  data: authReducer,
  language: languageReducer,


});

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
