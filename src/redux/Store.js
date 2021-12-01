import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import Reducers from "./reducers";
import sagas from "./sagas";
import { loadState, saveState } from "../utils/persistState.js";

const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState();

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV !== "production"
});

const store = createStore(
  Reducers,
  persistedState,
  applyMiddleware(sagaMiddleware, logger)
);
store.subscribe(() => {
  saveState({
    bankReducer: store.getState().bankReducer,
  });
});

export default store;

sagaMiddleware.run(sagas);
