import React from "react";
import PropTypes from "prop-types";
import FancyButton from "../components/FancyButton.jsx";
import "./itempage.css";
import {connect} from "react-redux";
import {addItem} from "../store/actions.js";
import * as services from "../services";

class ItemPage extends React.PureComponent{

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = () => {
    services.getItem({itemId: this.props.match.params.itemId})
        .then( item=>{
      this.setState({
        ...item
      });
    })
    .catch(err =>{
      console.log("item page ",err);
    });
  };

  handleBuy = () => {
    this.props.dispatch(addItem(this.state));
  };

  render() {
    return (
        <>
          <div className={"box spacer itemPage"}>
            <div style={{
              display: "flex",
            }}>
              <div className={"itemPage-left"}>
                <img src={this.state.imgSrc}/>
              </div>
              <div className={"itemPage-content"}>
                <div><h2>{this.state.title}</h2></div>
                <div>
                  <p className={"text--bold text--yellow"}>
                    {this.state.price} €
                  </p>
                </div>
                <div>
                  <p style={{textAlign: "justify"}}>
                    {loremIpsum}
                  </p>
                </div>
              </div>
            </div>
            <div className={"itemPage-footer"}>
              <FancyButton onClick={this.handleBuy}>Osta</FancyButton>
            </div>
          </div>
        </>
    );
  }
}

ItemPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default connect()(ItemPage);

const loremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
