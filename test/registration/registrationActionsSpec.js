import { expect } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {registrationActions, constants} from '../../src/registration/registrationActions';
import {config} from "../../src/api/http";

describe("Registration Actions", () => {

    let mockStore, api, store;
    let registrationFormStub = {'name': 'John', 'username': 'john', 'email': 'a@b.c'};
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

    it('should submit a POST request to /register and then dispatch actions', (done) => {
        const request = api.post(`/public/register`).reply(200, registrationFormStub);

        store.dispatch(registrationActions.register(registrationFormStub))
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal(constants.REGISTRATION_SUCCESSFUL);
                done();
            })
            .catch(done);
    });

    it("should dispatch validation error action when response status is 400", (done) => {
        const error = {
            "status": 400,
            "error": "Bad Request",
            "errors": [
                {
                    "defaultMessage": "size must be between 3 and 20",
                    "field": "username",
                },
                {
                    "defaultMessage": "size must be between 10 and 10",
                    "field": "pan",
                }
            ]
        };
        const request = api.post(`/public/register`).reply(400, error);

        store.dispatch(registrationActions.register(registrationFormStub))
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal(constants.REGISTRATION_VALIDATION_ERROR);
                done();
            })
            .catch(done);

    });

    it("should dispatch error action when response status is 500", (done) => {
        const request = api.post(`/public/register`).reply(500, {error: "Error occurred"});

        store.dispatch(registrationActions.register(registrationFormStub))
            .then((resp) => {
                request.done();
                expect(store.getActions()[0].type).to.equal(constants.REGISTRATION_ERROR);
                done();
            })
            .catch(done);

    });

});