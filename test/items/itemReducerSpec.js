import {expect} from 'chai';

import {constants} from '../../src/items/itemActions';
import reducer from '../../src/items/itemReducer';

describe('Items Reducer', () => {

    let preActionState = {
        status: "SUCCESS",
        items: []
    };

    it('should have the correct default state', () => {
        expect(reducer(undefined, {}).status).to.equal("SUCCESS");
    });

    it("should return a new state containing the supplied error when a GET_ITEMS_ERROR action is received", () => {
        const action = {type: constants.GET_ITEMS_ERROR, error: "Error occurred"};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.error).to.equal(action.error);
        expect(updatedState.status).to.equal("ERROR");
    });

    it("should return a new state with LOADING status when a GET_ITEMS_PROGRESS action is received", () => {
        const action = {type: constants.GET_ITEMS_PROGRESS};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.status).to.equal("LOADING");
    });

    it("should return a new state with items when a GET_ITEMS_SUCCESSFUL action is received", () => {
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
        const action = {type: constants.GET_ITEMS_SUCCESSFUL, resp: items};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.status).to.equal("SUCCESS");
        expect(updatedState.items.length).to.equal(2);
        expect(updatedState.items[0].itemName).to.equal("Item1");
    });
});
