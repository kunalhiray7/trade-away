import {constants} from "./checkoutActions";

const initialState = {
    itemToCheckout: {},
    status: "SUCCESS"
};

export default function checkout(state = initialState, action = {}) {
    switch (action.type) {
        case constants.ORDER_SUCCESS:
            return Object.assign({}, state, {
                status: "SUCCESS"
            });
        case constants.ORDER_ERROR:
            return Object.assign({}, state, {
                status: "ERROR"
            });
        default:
            return state
    }
}