import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import configureStore from "redux-mock-store";
import ItemListing from '../../src/items/containers/itemListingPage';
import Item from '../../src/items/components/item';

describe("Item Listing Page", () => {

    const items = [{
        "itemName": "Item1",
        "category": "SomeCategory",
        "description": "Some Desc",
        "imageUrl": "http://url",
        "price": 0.0,
        "sellers": ["Seller1"]
    },{
        "itemName": "Item2",
        "category": "SomeCategory",
        "description": "Some Desc",
        "imageUrl": "http://url",
        "price": 0.0,
        "sellers": ["Seller1"]
    }];

    const mockStore = configureStore([thunk]);
    const store = mockStore({items: {items: items}});

    it("should render the page title for given category", () => {
        let categoryName = "Food";
        const wrapper = mount(
            <Provider store = {store}>
                <ItemListing match = {{params: {categoryName: categoryName}}} />
            </Provider>
        );

        expect(wrapper.find("#title").text()).to.equal(`Category: ${categoryName}`);
    });

    it("should render the item list for given category", () => {
        let categoryName = "Electronics";
        const wrapper = mount(
            <Provider store = {store}>
                <ItemListing match = {{params: {categoryName: categoryName}}} />
            </Provider>
        );

        expect(wrapper.find("#item-list").type()).to.equal("div");
        expect(wrapper.find("#item-list").childAt(0).type()).to.equal(Item);
        expect(wrapper.find("#item-list").childAt(1).type()).to.equal(Item);
    });

});