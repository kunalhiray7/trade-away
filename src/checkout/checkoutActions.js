import {push} from 'react-router-redux';
import http, {APPLICATION_JSON, config} from '../api/http';

export const constants = {
    ORDER_SUCCESS: "ORDER_SUCCESS",
    ORDER_ERROR: "ORDER_ERROR"
};

const orderSuccess = () => ({
    type: constants.ORDER_SUCCESS
});

const orderFailed = (errorMessage) => ({
    type: constants.ORDER_ERROR
});

const navigateToItemListing = (category) => {
    return (dispatch) => {
        dispatch(orderSuccess()); //remove errors if any
        dispatch(push(`/category/${category}/items`));
    }
};

const navigateToOrderConfirmation = () => {
    return (dispatch) => {
        dispatch(push('/order/confirmation'))
    }
};

const submitOrder = (order) => {
    return (dispatch) => {
        return http.post(dispatch, `${config.serverUrl}/order`, order, {
            'Accept': APPLICATION_JSON
        }).then((resp) => {
            dispatch(orderSuccess());
            navigateToOrderConfirmation()(dispatch);
        }).catch((err) => {
            dispatch(orderFailed(err));
        })
    }
};

export const checkoutActions = {
    navigateToItemListing,
    submitOrder
};

