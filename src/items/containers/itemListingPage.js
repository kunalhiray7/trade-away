import {connect} from 'react-redux'

import ItemListing from '../components/itemListingPage';
import {itemActions} from '../itemActions'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadItems: (category) => {
            dispatch(itemActions.loadItems(category))
        },
        onBuy: (item) => {
            dispatch(itemActions.navigateToCheckout(item))
        }
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentCategory: ownProps.match.params.categoryName,
        items: state.items.items,
        status: state.items.status,
        error: state.items.error
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListing)
