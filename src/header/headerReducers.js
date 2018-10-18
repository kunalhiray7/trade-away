import {constants} from "./headerActions";

const initialState = {
    loggedIn: false
};

export default function navs(state = initialState, action = {}) {
    switch (action.type) {
        case constants.LOGGED_IN:
            return Object.assign({}, state, {
                loggedIn: !state.loggedIn
            });
        case constants.LOGGED_OUT:
            return Object.assign({}, state, {
                loggedIn: !state.loggedIn
            });
        default:
            return state
    }
}
