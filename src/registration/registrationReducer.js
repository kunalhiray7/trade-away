import { constants } from "./registrationActions";

const initialState = {
    status: "SUCCESS",
    validationErrors: undefined,
    error: undefined
};

export default function registrations(state = initialState, action = {}) {
    switch (action.type) {
        case constants.REGISTRATION_PROGRESS:
            return Object.assign({}, state, {
                status: "LOADING"
            });
        case constants.REGISTRATION_SUCCESSFUL:
            return Object.assign({}, state, {
                status: "SUCCESS"
            });
        case constants.REGISTRATION_ERROR:
            return Object.assign({}, state, {
                error: action.resp,
                status: "ERROR"
            });
        case constants.REGISTRATION_VALIDATION_ERROR:
            return Object.assign({}, state, {
                validationErrors: action.validationErrors,
                status: "ERROR"
            });
        default:
            return state
    }
}
