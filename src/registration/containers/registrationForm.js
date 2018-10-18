import {connect} from 'react-redux'

import { registrationActions } from '../registrationActions';
import RegistrationForm from '../components/registrationForm';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRegistration: (registrationForm) => {
            dispatch(registrationActions.register(registrationForm))
        },
        navigateToLogin: () => {dispatch(registrationActions.navigateToLogin())}
    };
};

const mapStateToProps = (state) => {

    return {
        status: state.registrations.status,
        validationErrors: state.registrations.validationErrors,
        error: state.registrations.error
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
