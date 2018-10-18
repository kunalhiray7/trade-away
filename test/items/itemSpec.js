import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import configureStore from "redux-mock-store";
import Item from '../../src/items/components/item';

describe("Item", () => {

    const mockStore = configureStore();
    const store = mockStore({});

    it("should render item", () => {
        const itemProps = {
            "itemName": "Item2",
            "category": "SomeCategory",
            "description": "Some Desc",
            "imageUrl": "http://url",
            "price": 0.0,
            "sellers": ["Seller1"]
        };
        const wrapper = shallow(<Item item={itemProps}/>);

        expect(wrapper.find("CardImg").prop("src")).to.equal(itemProps.imageUrl);
        expect(wrapper.find("CardTitle").html()).contains(itemProps.itemName);
        expect(wrapper.find("CardSubtitle").html()).contains(itemProps.price);
        expect(wrapper.find("CardText").html()).contains(itemProps.description);
    });

});