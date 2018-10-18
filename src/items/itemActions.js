import http, {APPLICATION_JSON, config} from "../api/http";
import { push } from 'react-router-redux'

export const constants = {
    GET_ITEMS_ERROR: "GET_ITEMS_ERROR",
    GET_ITEMS_SUCCESSFUL: "GET_ITEMS_SUCCESSFUL",
    GET_ITEMS_PROGRESS: "GET_ITEMS_PROGRESS"
};

const getItemsSuccess = (resp) => ({
    type: constants.GET_ITEMS_SUCCESSFUL,
    resp
});

const getItemsError = (resp) => ({
    type: constants.GET_ITEMS_ERROR,
    resp
});

const loadItems = (category) => {
    return (dispatch) => {
        return http.get(dispatch, `${config.serverUrl}/category/${category}/items`, {}, {
            'Accept': APPLICATION_JSON
        }).then((resp) => {
            dispatch(getItemsSuccess(resp));
            return resp
        }).catch((err) => {
            dispatch(getItemsError(`Unable to fetch categories: ${err.status} (${err.statusText})`))
        })
    }
};

const navigateToCheckout = (item) => {
    return (dispatch) => {
        dispatch(push(`/checkout`, {itemToCheckout: item}))
    }
};


export const itemActions = {
    loadItems,
    navigateToCheckout
};