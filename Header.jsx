import React from "react";

const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" src="./images/apple.png" />
      <div className="header__buttons">
        <button>Login/Signup</button>
        <button>Cart</button>
      </div>
  	</div>
  )
};

export default Header;
