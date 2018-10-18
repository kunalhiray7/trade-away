import {Route} from 'react-router'
import React from "react";
import Login from "./login/containers/loginForm";
import RegistrationForm from "./registration/containers/registrationForm";
import CategoryPage from "./category/containers/categoryPage"
import NavigationBar from "./header/containers/header";
import ItemListing from "./items/containers/itemListingPage";
import CheckoutPage from './checkout/containers/checkout'
import OrderConfirmation from './checkout/components/orderConfirmation';

export const getRoutes = (history) => {
    return (
        <div>
            <NavigationBar history={history}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={RegistrationForm}/>
            <Route exact path="/category" component={CategoryPage}/>
            <Route exact path="/category/:categoryName/items" component={ItemListing}/>
            <Route exact path="/checkout" component={CheckoutPage}/>
            <Route exact path="/order/confirmation" component={OrderConfirmation}/>
        </div>
    )
};