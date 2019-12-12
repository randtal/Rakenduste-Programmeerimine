import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import ItemPage from "./Pages/ItemPage.jsx";
import Header from "./Components/Header.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import UserPage from "./Pages/UserPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import NotFound from "./Pages/NotFound.jsx";
import store from "./store.js";
import "./Pages/main.css";
console.log("hello world, store", store);

/*const authReducer = (state, action) => {
    switch (action.type){
        case USER_LOADED: {
            return{
                ...state,
                ...action.payload,
            };
        }
        default:{
            return state;
        }
    }
};*/

const authDefaultValue = {
    token: null,
    user: {
        email: null,
        _id: null,
        createdAt: null
    }
};
export const AuthContext = React.createContext(authDefaultValue);

class App extends React.Component {
    state = authDefaultValue;

    handleLogin = ({ token, user }) => {
        this.setState({
            user,
            token
        });
    };

    //history {..props}
    render() {
        return (
            <AuthContext.Provider value={this.state}>
                <BrowserRouter>
                    <Route path={"/"} component={Header} />
                    <switch>
                        <Route path="/" exact component={HomePage} />
                        <Route
                            path="/login"
                            exact
                            render={props => <LoginPage {...props} onLogin={this.handleLogin} />}
                        />
                        <Route path="/signup" exact component={SignupPage} />
                        <Route path="/users/:userId" exact component={UserPage}/>
                        <Route path="/items/:itemId" exact component={ItemPage} />
                        <Route path="/checkout/cart" exact component={CartPage} />
                        <Route component={NotFound} />
                    </switch>
                </BrowserRouter>
            </AuthContext.Provider>
        );
    }
}
const root = document.getElementById("app");
ReactDOM.render(<App />, root);