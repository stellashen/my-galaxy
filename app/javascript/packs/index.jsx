import React from "react";
import ReactDOM from "react-dom";
import Root from "../components/root";

document.addEventListener("DOMContentLoaded", () => {
  let token;
  if (window.token) {
    token = window.token;
  }
  const root = document.getElementById("root");
  ReactDOM.render(<Root token={token} />, root);
});
