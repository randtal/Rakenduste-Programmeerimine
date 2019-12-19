import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ItemsList = (props) => {
    console.log("items list", props);
  return (
    <div className={"content"}>
      {
        props.items.map( item => {
          return <Item
              key={item._id}
              id={item._id}
              imgSrc={item.imgSrc}
              price={item.price}
              title={item.title}
            />;
          })
      }
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired
};

const Item = props => {
  return (
      <Link to={`/items/${props.id}`} className={"item"}>
        <div className={"item_imgWrapper"}>
          <img src={props.imgSrc} />
        </div>
        <div className={"itemDescription"}>
          <div className="item__title">{props.title}</div>
          <div className={"itemFooter"}>
            <div className="item__price">${props.price}</div>
          </div>
        </div>
      </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ItemsList;
