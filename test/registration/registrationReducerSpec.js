import {expect} from 'chai';

import {constants} from '../../src/registration/registrationActions';
import reducer from '../../src/registration/registrationReducer';

describe('Registration Reducer', () => {

    let preActionState = {
        status: "SUCCESS"
    };

    it('should have the correct default state', () => {
        expect(
            reducer(undefined, {}).status
        ).to.equal("SUCCESS");
    });

    it("should return a new state containing the supplied error when a REGISTRATION_ERROR action is received", () => {
        const action = {type: constants.REGISTRATION_ERROR, resp: "Error occurred"};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.error).to.equal(action.resp);
        expect(updatedState.status).to.equal("ERROR");
    });

    it("should return a new state with status LOADING when a REGISTRATION_PROGRESS action is received", () => {
        const action = {type: constants.REGISTRATION_PROGRESS};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.status).to.equal("LOADING");
    });

    it("should return a new state with status SUCCESS when a REGISTRATION_SUCCESSFUL action is received", () => {
        const action = {type: constants.REGISTRATION_SUCCESSFUL};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.status).to.equal("SUCCESS");
    });

    it("should return a new state with validation errors when a REGISTRATION_VALIDATION_ERROR action is received", () => {
        const action = {type: constants.REGISTRATION_VALIDATION_ERROR, validationErrors: {name: "cannot be empty"}};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.status).to.equal("ERROR");
        expect(updatedState.validationErrors.name).to.equal("cannot be empty");
    });

});
