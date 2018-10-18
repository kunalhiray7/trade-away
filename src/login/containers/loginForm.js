import {connect} from 'react-redux'

import {loginActions} from '../loginActions.js';
import LoginForm from '../components/loginForm';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLoginAttempt: (loginForm) => {
            dispatch(loginActions.attemptLogin(loginForm))
        },
        registerNewUser: () => {
            dispatch(loginActions.navigateToNewUser())
        }
    };
};

const mapStateToProps = (state) => {
    return {
        status: state.logins.status
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
