import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// import authConsumer from "./authConsumer";
// import UserPage from "../Pages/UserPage";

const protectedRedirect = (WrappedComponent) => {
    return class extends React.PureComponent {
        static displayName = "protected-redirect-hoc";
        static propTypes = {
            user: PropTypes.object.isRequired,
        };
        render(){
            if (!this.props.user.email) return <Redirect to={"/"} />;
            return (
                <WrappedComponent {...this.props} />
            );
        }
    };
};

export default protectedRedirect;