import {expect} from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {constants, loginActions} from '../../src/login/loginActions';
import {config} from "../../src/api/http";

describe("Login Actions", () => {

    let mockStore, api, store;
    let loginFormStub = {'username': 'john', 'password': 'password'};
    let authStub = {'token': 'token', 'role': 'buyer'};
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

    it("should submit a post request to /login and dispatch actions", (done) => {
        const request = api.post(`/public/login`).reply(200, authStub);

        store.dispatch(loginActions.attemptLogin(loginFormStub))
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal("@@router/CALL_HISTORY_METHOD");
                done();
            })
            .catch(done);

    });

    it("should submit a post request to /login and dispatch actions when error occurs", (done) => {
        const request = api.post(`/public/login`).reply(401, authStub);

        store.dispatch(loginActions.attemptLogin(loginFormStub))
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal("@@router/CALL_HISTORY_METHOD");
                done();
            })
            .catch(done);

    });

});