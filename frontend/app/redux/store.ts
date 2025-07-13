import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "./slice/registeringUser.slice";
import userAuthenticationReducer from "./slice/authenticatingUser.slice";
import createGroupReducer from "./slice/createGroup";
import fetchGroupsReducers from "./slice/fetchGroups";
import fecthUserByUsernameReducer from "./slice/GetUserByUsername.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
  blacklist: ["register", "creatingGroup", "fetchGroups"],
};

const rootReducer = combineReducers({
  register: userRegisterReducer,
  authentication: userAuthenticationReducer,
  creatingGroup: createGroupReducer,
  fecthGroups: fetchGroupsReducers,
  fetchingUser: fecthUserByUsernameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
