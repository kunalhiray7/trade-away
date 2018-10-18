import http, {
    config,
    APPLICATION_JSON
} from "../api/http";

import { push } from 'react-router-redux'

export const constants = {
    GET_CATEGORIES_ERROR: "GET_CATEGORIES_ERROR",
    GET_CATEGORIES_SUCCESSFUL: "GET_CATEGORIES_SUCCESSFUL",
    GET_CATEGORIES_PROGRESS: "GET_CATEGORIES_PROGRESS"
};

const getCategoriesSuccess = (resp) => ({
    type: constants.GET_CATEGORIES_SUCCESSFUL,
    resp
});

const getCategoriesError = (resp) => ({
    type: constants.GET_CATEGORIES_ERROR,
    resp
});

const getCategories = () => {
    return (dispatch) => {
        return http.get(dispatch, `${config.serverUrl}/category`, {},{
            'Accept': APPLICATION_JSON
        }).then((resp) => {
            dispatch(getCategoriesSuccess(resp));
            return resp
        }).catch((err) => {
            dispatch(getCategoriesError(`Unable to fetch categories: ${err.status} (${err.statusText})`))
        })
    }
};

const navigateToItemListing = (category) => {
    return (dispatch) => {
        dispatch(push(`/category/${category}/items`))
    }
};

export const categoryActions = {
    getCategories,
    navigateToItemListing
};