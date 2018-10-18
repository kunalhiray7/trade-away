import {expect} from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {itemActions, constants} from '../../src/items/itemActions';
import {config} from "../../src/api/http";

describe("Items Actions", () => {

    let mockStore, api, store;
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
    let error500 = {status: '500', statusText: 'Internal Server Error'};

    before(() => {
        mockStore = configureMockStore([thunk]);
        api = nock(config.serverUrl);
    });

    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        store.clearActions();
        nock.cleanAll()
    });

    it('should submit a GET request to /category/{categoryName}/items and then dispatch actions', (done) => {
        const categoryName = "Electronics";
        const request = api.get(`/category/${categoryName}/items`).reply(200, items);

        store.dispatch(itemActions.loadItems(categoryName))
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal(constants.GET_ITEMS_SUCCESSFUL);
                done();
            })
            .catch(done);
    });

    it('should dispatch an error when error occurs while fetching category', (done) => {
        const categoryName = "Electronics";
        const request = api.get(`/category/${categoryName}/items`).reply(500, error500);

        store.dispatch(itemActions.loadItems(categoryName))
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal(constants.GET_ITEMS_ERROR);
                done();
            })
            .catch(done);
    });


});