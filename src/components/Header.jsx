import React from "react";
import { Link } from "react-router-dom";
import {userIcon, cartIcon} from "../icons";
import "./header.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
//import {ItemProps} from "../pages/CartPage.jsx";
import { UserPropTypes } from "../store/reducer.js";
import * as selectors from "../store/selector.js";

const Header = ({user, cart}) => {
    return (
        <div className="header">
            <Link to={"/"}>
                <img src="/static/images/apple.png" className={"header__logo"}/>
            </Link>
            <div className="header__buttons">
                {user && <WelcomeIcon user={user}/>}
                {!user && <LoginRegisterIcon />}

                <Link to={"/checkout/cart"} className={"header__button"}>
                    <img src={cartIcon} />
                    <div className={"header__button-text"}>Cart</div>
                    <Badge>{cart.length}</Badge>
                </Link>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.shape(UserPropTypes),
    cart: PropTypes.arrayOf(PropTypes.string).isRequired,
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
