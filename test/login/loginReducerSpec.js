import {expect} from 'chai';
import reducer from '../../src/login/loginReducers'
import {constants} from "../../src/login/loginActions";

describe("Login Reducers", () => {

    it("should have valid default state", () => {
        expect(reducer(undefined, {}).status).to.equals("");
    });

    it("should reduce the state on error", () => {
        let reducedState = reducer({status:""}, {type: constants.LOGIN_ERROR});
        expect(reducedState.status).to.equals("ERROR");
    });

    it("should reduce the state on success", () => {
        let reducedState = reducer({status:""}, {type: constants.LOGIN_SUCCESSFUL});
        expect(reducedState.status).to.equals("SUCCESS");
    });

});