import {connect} from 'react-redux'

import CheckoutPage from '../components/checkoutPage';
import {checkoutActions} from "../checkoutActions";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCancel: (category) => {
            dispatch(checkoutActions.navigateToItemListing(category))
        },
        onSubmit: (order) => {
            dispatch(checkoutActions.submitOrder(order))
        }
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        itemToCheckout: ownProps.location.state.itemToCheckout,
        status: state.checkout.status
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)