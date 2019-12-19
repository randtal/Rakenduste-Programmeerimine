import React from "react";
import ReactDOM from "react-dom";
import "./pages/main.css";
import App from "./App.jsx";

window.addEventListener("load", () =>{
    const root = document.getElementById("app");
    ReactDOM.render(<App />, root);
});