import { constants } from "./categoryActions";

const initialState = {
    categories: [],
    status: "SUCCESS"
};

export default function categories(state = initialState, action = {}) {
    switch (action.type) {
        case constants.GET_CATEGORIES_PROGRESS:
            return Object.assign({}, state, {
                status: "LOADING"
            });
        case constants.GET_CATEGORIES_SUCCESSFUL:
            return Object.assign({}, state, {
                status: "SUCCESS",
                categories: action.resp.categories
            });
        case constants.GET_CATEGORIES_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                status: "ERROR"
            });
        default:
            return state
    }
}
