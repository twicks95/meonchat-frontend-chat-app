import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducer"; // ./reducer/index.js
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger)
);
export const persistor = persistStore(store);

export default createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, logger)
);
