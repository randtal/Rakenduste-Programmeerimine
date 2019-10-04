import React from "react";
import {os,systems} from "./mydatabase.js";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";

class HomePage extends React.PureComponent{

  constructor(props){;
    super(props);
    this.state = {
      items: os,
    }
  }

  handleChange(event){
    console.log(event.target.value);
    switch (target.value) {
      case "os":
        this.setState({
            items: os,
          });
        break;

      case "systems":
        this.setState({
          items: systems,
        });
      break;
   }
  };

  render(){
    return (<>
      <Header/>
        <select onChange={this.handleChange}>
          <option value="os">Operating Systems</option>
          <option value="systems">Computer Systems</option>
        </select>
        <ItemList items={this.state.items} />
      </>);
  }
}

export default HomePage;
