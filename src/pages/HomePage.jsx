import React from "react";
import ItemsList from "../components/ItemsList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import PropTypes from "prop-types";
import "./homepage.css";
import SortDropdown from "../components/SortDropdown.jsx";
//import "../components/itemsList.css";

class HomePage extends React.PureComponent{

  constructor(props){
    super(props);
    this.state = {
      sortDirection: -1,
      items: [],
      allCategories: ["os", "systems"],
      selectedCategories: ["os"]
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    fetch("/api/items")
      .then(res => {
        console.log("res", res);
        return res.json();
      })
      .then(items => {
        console.log("items", items);
        this.setState({
          items
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleDropdown = event => {
    console.log(event.target.value, event.target.name);
    if(this.isSelected(event.target.name)){
        const clone = this.state.selectedCategories.slice();
        const index = this.state.selectedCategories.indexOf([event.target.name]);
        clone.splice(index, 1);
        this.setState({
          selectedCategories: clone
        });
    } else {
      this.setState({
        selectedCategories: this.state.selectedCategories.concat([event.target.name])
      });
    }
  };

  getVisibleItems = () => {
    return this.state.items
      .filter( item => this.isSelected(item.category))
      .sort( (a, b) => {
        switch(this.state.sortDirection){
          case -1: return b.price - a.price;
          case 1: return a.price - b.price;
        }
      });
  };

  isSelected = (name) => this.state.selectedCategories.indexOf(name) >= 0;

  handleSortDropdown = (sortDirection) => {
    this.setState({
      sortDirection: sortDirection,
    });
  };

  render() {
    const items = this.getVisibleItems();
    return (
        <>
          <div className={"bodyWrapper"}>
            <div className={"filtersWrapper"}>
              <ItemFilters
                  allCategories={this.state.allCategories}
                  handleDropdown={this.handleDropdown}
                  isSelected={this.isSelected}
              />
            </div>
            <div className={"itemsHeaderWrapper"}>
              <div>
                Items found {items.length}{" "}
                {this.state.selectedCategories.join(", ")}
              </div>
              <SortDropdown
                  direction={this.state.sortDirection}
                  onChange={this.handleSortDropdown}
              />
            </div>
            <ItemsList items={items} />
          </div>
        </>
    );
  }
}

const ItemFilters = ({allCategories, handleDropdown, isSelected}) => {
  return (
    <div className={"itemFilers-wrapper"}>
      {
        allCategories.map( categoryName => {
          return (
            <Checkbox
              key={categoryName}
              name={categoryName}
              onChange={handleDropdown}
              checked={isSelected(categoryName)}

            />
          );
        })
      }
    </div>
  );
};

ItemFilters.propTypes = {
  allCategories: PropTypes.array.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default HomePage;
