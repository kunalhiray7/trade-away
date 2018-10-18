import {push} from 'react-router-redux'

export const constants = {
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT"
};

const logout = () => ({
    type: constants.LOGGED_OUT
});

const login = () => ({
    type: constants.LOGGED_IN
});

const logoutUser = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(push("/"));
        dispatch(logout());
    }
};

export const headerActions = {
    logoutUser,
    login
};