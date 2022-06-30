import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { counterReducer } from "./reducer";
import { Provider } from "react-redux";

// nice version of comment below
const myLogger = (store) => (next) => (action) => {
  return next(action);
};

// const myLogger = (store) => {
//   return (next) => {
//     return (action) => {
// middleware takes place before action
//       console.log("middleware ran");
//       return next(action);
//     };
//   };
// };

const secondMiddleware = (store) => (next) => (action) => {
  return next(action);
};

const capAtTen = (store) => (next) => (action) => {
  if (store.getState() >= 10) {
    return next({ type: "DECREMENT" });
  }
  next(action);
};

// params: reducer and applyMiddleware with middleware as its params
// if you have more than one middleware, then it will be ...myLogger, mySecondLogger
const store = createStore(
  counterReducer,
  applyMiddleware(myLogger, secondMiddleware, capAtTen)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
