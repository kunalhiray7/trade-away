import http, {APPLICATION_JSON, config} from '../api/http';
import GlobalConstants from '../common/constants';
import {push} from 'react-router-redux';
import {headerActions} from '../header/headerActions'

export const constants = {
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGIN_SUCCESSFUL: "LOGIN_SUCCESSFUL",
    LOGIN_PROGRESS: "LOGIN_PROGRESS"
};

const updateLocalStorage = (resp) => {
    localStorage.setItem(GlobalConstants.AUTH_TOKEN, resp.token);
    localStorage.setItem(GlobalConstants.AUTH_NAME, resp.name);
    localStorage.setItem(GlobalConstants.AUTH_USER_TYPE, resp.role);
    localStorage.setItem(GlobalConstants.AUTH_USERNAME, resp.userName);
};

const loginFailure = () => ({
    type: constants.LOGIN_ERROR
});

const attemptLogin = (loginForm) => {
    return (dispatch) => {
        return http.post(dispatch, `${config.serverUrl}/public/login`, {
            'username': loginForm.username,
            'password': loginForm.password
        }, {
            'Accept': APPLICATION_JSON
        }).then((resp) => {
            updateLocalStorage(resp);
            navigateToUserHome(resp.role)(dispatch);
            dispatch(headerActions.login());
        }).catch((err) => {
            dispatch(loginFailure());
        })
    }
};

const navigateToNewUser = () => {
    return (dispatch) => {
        dispatch(push("/register"))
    }
};

const navigateToUserHome = (userType) => {
    return (dispatch) => {
        if (userType === "BUYER") {
            dispatch(push("/category"))
        } else {
            dispatch(push("/seller"))
        }
    }
};

export const loginActions = {
    attemptLogin,
    navigateToNewUser
};