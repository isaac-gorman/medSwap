import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./store/reducers";
import * as serviceWorker from "./serviceWorker";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { loadState, saveState } from "./api/index";

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(thunk, logger)
);

store.subscribe(() => {
  saveState(
    store.getState({
      email: store.getState().email,
      password: store.getState().password,
      id: store.getState().id,
    })
  );
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
