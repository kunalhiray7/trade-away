import CategoryPage from "../components/categoryPage"

import {connect} from 'react-redux'

import { categoryActions } from '../categoryActions';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadCategories:() => {dispatch(categoryActions.getCategories())},
        navigateToItemListing:(categoryName) => {dispatch(categoryActions.navigateToItemListing(categoryName))}
    };
};

const mapStateToProps = (state) => {

    return {

        status: state.categories.status,
        categories: state.categories.categories

    }

};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
