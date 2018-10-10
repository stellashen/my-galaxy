import React from "react";
import ReactDOM from "react-dom";
import configureStore from "../store/store";
import Root from "../components/root";

document.addEventListener("DOMContentLoaded", () => {
  let token;
  if (window.token) {
    token = window.token;
    delete window.token;
  }
  const store = configureStore();
  // testing in console: window.getState() to see the state shape
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} token={token} />, root);
});
