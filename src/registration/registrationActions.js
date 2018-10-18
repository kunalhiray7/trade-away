import http, {APPLICATION_JSON, config} from "../api/http";
import { push } from 'react-router-redux'

import mapErrors from '../utils/validationErrorsUtil';

export const constants = {
    REGISTRATION_ERROR: "REGISTRATION_ERROR",
    REGISTRATION_SUCCESSFUL: "REGISTRATION_SUCCESSFUL",
    REGISTRATION_PROGRESS: "REGISTRATION_PROGRESS",
    REGISTRATION_VALIDATION_ERROR: "REGISTRATION_VALIDATION_ERROR"
};

const registrationSuccess = (resp) => ({
    type: constants.REGISTRATION_SUCCESSFUL,
    resp
});

const registrationError = (resp) => ({
    type: constants.REGISTRATION_ERROR,
    resp
});

const registrationValidationError = (validationErrors) => ({
    type: constants.REGISTRATION_VALIDATION_ERROR,
    validationErrors
});

const register = (registrationForm) => {
    return (dispatch) => {
        return http.post(dispatch, `${config.serverUrl}/public/register`, registrationForm, {
            'Accept': APPLICATION_JSON
        }).then((resp) => {
            dispatch(registrationSuccess(resp));
            dispatch(navigateToLogin());
            return resp
        }).catch((err) => {
            if(err.status === 400) {
                dispatch(registrationValidationError(mapErrors(JSON.parse(err.body))));
            }
            dispatch(registrationError(`Unable to submit the registration form: ${err.status} (${err.statusText})`))
        })
    }
};

const navigateToLogin = () => {
    return (dispatch) => {
        dispatch(push("/"))
    }
};

export const registrationActions = {
    register,
    navigateToLogin
};