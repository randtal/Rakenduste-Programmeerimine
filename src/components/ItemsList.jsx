import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./itemlist.css";

const ItemList = (props) => {
    return(
        <div className={"products"}>
            {
                props.items.map( item => {
                    return <Item
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        price={item.price}
                        imgSrc={item.imgSrc}
                    />;
                })
            }
        </div>
    );
};

ItemList.propTypes = {
  items: PropTypes.array.isRequired
};

const Item = (props) => {
    return(
        <Link  className="product" to={`/items/${props.id}`}>
            <div className={"product-content"}>
                <img alt={props.title} src={props.imgSrc} className="product-image" />
                <p className="product-cost">{props.price}</p>
                <p className="product-title">{props.title}</p>
            </div>
        </Link>
    );
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default ItemList;
