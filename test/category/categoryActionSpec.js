import {expect} from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {categoryActions, constants} from '../../src/category/categoryActions';
import {config} from "../../src/api/http";

describe("Category Actions", () => {

    let mockStore, api, store;
    const categories = [
        {
            categoryName: "Food"
        },{
            categoryName: "Entertainment"
        }
    ];
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

    it('should submit a GET request to /category and then dispatch actions', (done) => {
        const request = api.get(`/category`).reply(200, categories);

        store.dispatch(categoryActions.getCategories())
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal(constants.GET_CATEGORIES_SUCCESSFUL);
                done();
            })
            .catch(done);
    });

    it('should dispatch an error when error occurs while fetching category', (done) => {
        const request = api.get(`/category`).reply(500, error500);

        store.dispatch(categoryActions.getCategories())
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal(constants.GET_CATEGORIES_ERROR);
                done();
            })
            .catch(done);
    });


});