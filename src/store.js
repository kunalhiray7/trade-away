import {createStore, applyMiddleware, combineReducers} from "redux";
import {routerMiddleware, routerReducer as routing} from "react-router-redux";
import thunk from "redux-thunk";
import logins from "./login/loginReducers";
import registrations from "./registration/registrationReducer";
import categories from "./category/categoryReducer"
import navs from "./header/headerReducers"
import items from "./items/itemReducer"
import checkout from "./checkout/checkoutReducers"

export default function configureStore(initialState, browserHistory) {
    const middleware = routerMiddleware(browserHistory);

    const rootReducer = combineReducers({
        routing,
        logins,
        registrations,
        categories,
        navs,
        items,
        checkout
    });

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, middleware)
    )
}
