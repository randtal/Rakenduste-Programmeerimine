import React from "react";
import Header from "./Header.jsx";
import {os} from "./mydatabase.js";

class ItemPage extends React.PureComponent{
  render(){
    const item = os[0];
    return <>
      <Header/>
      <div className={"itemContainer"}>
        <img src={item.imageSrc} />
        <div className = {"item__title"}>{item.title}</div>
        <div className = {"item__price"}>{item.price}</div>
      </div>
    </>;
  }
}

export default ItemPage;
