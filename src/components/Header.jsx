import React from "react";
import { Link } from "react-router-dom";
import {userIcon, cartIcon} from "../icons";
import "./header.css";
import PropTypes from "prop-types";
import authConsumer from "./authConsumer.jsx";

const Header = ({ user }) => {
    return (
        <div className="header">
            <Link to={"/"}>
                <img className="headerLogo" src="/images/Logo.jpg" />
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
                    </button>
                </Link>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.object,
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

export default authConsumer(Header);
