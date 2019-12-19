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
                <div className={"container"}>
                    <h1>Login</h1>
                    <div className={"form"}>
                        <form onSubmit={this.handleSubmit}>
                            <p>
                                <input
                                    placeholder={"email"}
                                    name="email"
                                    type={"email"}
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                            </p>
                            <p>
                                <input
                                    placeholder={"Password"}
                                    name="password"
                                    type={"password"}
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                            </p>
                            <p>
                                <button onClick="login" type="submit">Log In</button>
                            </p>
                            <p className="message"> Not registered? <Link to={"/signup"}>Create an account</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default connect()(LoginPage);