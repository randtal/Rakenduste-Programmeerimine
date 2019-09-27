import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";

const root = document.getElementById("app");

const App = () => {
  return (
    <>
      <Header/>
      <ItemList />
    </>
  )
};

ReactDOM.render(
  <App/>,
  root
);
