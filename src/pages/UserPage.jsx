import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FancyButton from "../components/FancyButton.jsx";
import {userUpdate, tokenUpdate} from "../store/actions";
import protectedRedirect from "../components/protectedRedirect.jsx";
import { UserPropTypes } from "../store/reducer.js";
import * as selectors from "../store/selectors";

class UserPage extends React.PureComponent {
    static propTypes = {
        user: PropTypes.shape(UserPropTypes),
        dispatch: PropTypes.func.isRequired,
        token: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    };

    handleLogout = () => {
        this.props.dispatch(userUpdate(null));
        this.props.dispatch(tokenUpdate(null));
    };

    render() {
        return (
            <div className={"spacer"}>
                <div className={"box"}>
                    <div>
                        <div className={"field"}>
                            {this.props.user.email}
                        </div>
                        <div className={"field"}>
                            {this.props.user.createdAt}
                        </div>
                    </div>
                    <FancyButton onClick={this.handleLogout}>Logi välja</FancyButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: selectors.getUser(store),
    };
};

export default connect(mapStateToProps)(protectedRedirect(UserPage));