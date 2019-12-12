import React from "react";
import { Link } from "react-router-dom";
import {userIcon, cartIcon} from "../icons";
import "./header.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ItemProps} from "../pages/CartPage.jsx";
import * as selectors from "../store/selector.js";

const Header = ({ user, cart}) => {
    return (
        <div className="header">
            <Link to={"/"}>
                <img className="headerLogo" src="/static/images/Logo.jpg" />
            </Link>
            <div className="headerButtons">

                {user.email && <WelcomeIcon user={user} />}
                {!user.email && <LoginRegisterIcon />}

                <Link className="headerButton" to={"/checkout/cart"}>
                    <button className="instagram" type="submit">
                        <img
                            className={"buttonImage"}
                            src={cartIcon}
                            alt=""
                            style={{ height: 35 }}
                        />
                        Cart
                        <Badge>{cart.length}</Badge>
                    </button>
                </Link>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.object,
    cart: PropTypes.arrayOf(ItemProps).isRequired,
};

const Badge = ({children}) => {
    if(children === 0) return null;
    return(
        <span className={"badge"}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.number.isRequired
};

const LoginRegisterIcon = () => (
    <Link className={"header__button"} to="/login">
        <img src={userIcon} style={{height: 45}} />
        <div className={"header__button-text"}>Login/<br/>Register</div>
    </Link>
);

const WelcomeIcon = ({user}) => (
    <Link className={"header__button"} to={`/users/${user._id}`}>
        <img src={userIcon} style={{height: 45}} />
        <div className={"header__button-text"}>Login/<br/>Welcome, {user.email}</div>
    </Link>
);

WelcomeIcon.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (store) => {
    return {
        cart: selectors.getCart(store),
        user: selectors.getUser(store),
    };
};

export default connect(mapStateToProps)(Header);
