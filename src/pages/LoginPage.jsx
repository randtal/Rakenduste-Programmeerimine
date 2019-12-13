import React from "react";
import "./form.css";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import * as services from "../services";
import {userUpdate, tokenUpdate} from "../store/actions";

class LoginPage extends React.PureComponent {

    static propTypes = {
        history: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit", e, this.state);
        services.login(this.state)
            .then(this.handleSuccess)
            .catch(err => {
                console.log("error", err);
                toast.error("Login failed");
            });
    };

    handleSuccess = ({token, user}) => {
        this.props.dispatch(userUpdate(user));
        this.props.dispatch(tokenUpdate(token));
        this.props.history.push(`/users/${user._id}`);
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        return (
            <>
                <div>
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                </div>
                <div className="form">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <button>login</button>
                        <p className="message">
                            Not registered? <Link to={"/signup"}>Create an account</Link>
                        </p>
                    </form>
                </div>
            </>
        );
    }
}
export default connect()(LoginPage);