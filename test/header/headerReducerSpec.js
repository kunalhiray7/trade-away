import {expect} from 'chai';
import reducer from '../../src/header/headerReducers';
import {constants} from '../../src/header/headerActions';

describe("Header Reducers", () => {

    it("should have valid default state", () => {
        expect(reducer(undefined, {}).loggedIn).to.equals(false);
    });

    it("should reduce to new state when login happens", () => {
        let newState = reducer({loggedIn: false}, {type: constants.LOGGED_IN});
        expect(newState.loggedIn).to.equals(true);
    });

    it("should reduce to new state when logout happens", () => {
        let newState = reducer({loggedIn: true}, {type: constants.LOGGED_IN});
        expect(newState.loggedIn).to.equals(false);
    });
});