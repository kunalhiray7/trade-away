import { constants } from "./loginActions";

const initialState = {
    status: ""
};

export default function logins(state = initialState, action = {}) {
    switch (action.type) {
        case constants.LOGIN_PROGRESS:
            return Object.assign({}, state, {
                status: "LOADING"
            });
        case constants.LOGIN_SUCCESSFUL:
            return Object.assign({}, state, {
                status: "SUCCESS"
            });
        case constants.LOGIN_ERROR:
            return Object.assign({}, state, {
                status: "ERROR"
            });
        default:
            return state
    }
}
