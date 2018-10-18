import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import CategoryPage from '../../src/category/containers/categoryPage';
import GlobalConstants from '../../src/common/constants';

describe("Category Page", () => {

    const mockStore = configureStore([thunk]);
    const categories = [
        {
            categoryName: "Food"
        },{
            categoryName: "Entertainment"
        }
    ];
    const store = mockStore({
        categories: {
            status: "success",
            categories: categories
        }
    });
    const username = "John";
    localStorage.setItem(GlobalConstants.AUTH_NAME, username);

    it("should render logged in user's name", () => {
        const wrapper = mount(
            <Provider store = {store}>
                <CategoryPage />
            </Provider>
        );

        expect(wrapper.find("#username").type()).to.equal("label");
        expect(wrapper.find("#username").text()).to.equal(username);
    });

    it("should render all available categories", () => {
        const wrapper = mount(
            <Provider store = {store}>
                <CategoryPage />
            </Provider>
        );

        let categoriesElement = wrapper.find("#categories");
        expect(categoriesElement.childAt(0).text()).to.equal(categories[0].categoryName);
        expect(categoriesElement.childAt(1).text()).to.equal(categories[1].categoryName);
    });

});