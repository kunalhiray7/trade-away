import { constants } from "./itemActions";

const initialState = {
    items: [],
    status: "SUCCESS"
};

export default function items(state = initialState, action = {}) {
    switch (action.type) {
        case constants.GET_ITEMS_PROGRESS:
            return Object.assign({}, state, {
                status: "LOADING"
            });
        case constants.GET_ITEMS_SUCCESSFUL:
            return Object.assign({}, state, {
                status: "SUCCESS",
                items: action.resp
            });
        case constants.GET_ITEMS_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                status: "ERROR"
            });
        default:
            return state
    }
}
