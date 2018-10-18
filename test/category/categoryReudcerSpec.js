import {expect} from 'chai';

import {constants} from '../../src/category/categoryActions';
import reducer from '../../src/category/categoryReducer';

describe('Category Reducer', () => {

    let preActionState = {
        status: "SUCCESS"
    };

    it('should have the correct default state', () => {
        expect(reducer(undefined, {}).status).to.equal("SUCCESS");
    });

    it("should return a new state containing the supplied error when a GET_CATEGORIES_ERROR action is received", () => {
        const action = {type: constants.GET_CATEGORIES_ERROR, error: "Error occurred"};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.error).to.equal(action.error);
        expect(updatedState.status).to.equal("ERROR");
    });

    it("should return a new state with LOADING status when a GET_CATEGORIES_PROGRESS action is received", () => {
        const action = {type: constants.GET_CATEGORIES_PROGRESS};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.status).to.equal("LOADING");
    });

    it("should return a new state with categories when a GET_CATEGORIES_SUCCESSFUL action is received", () => {
        const categories = [
            {
                categoryName: "Food"
            },{
                categoryName: "Entertainment"
            }
        ];
        const action = {type: constants.GET_CATEGORIES_SUCCESSFUL, resp: {categories:categories}};

        const updatedState = reducer(preActionState, action);

        expect(updatedState.status).to.equal("SUCCESS");
        expect(updatedState.categories.length).to.equal(2);
        expect(updatedState.categories[0].categoryName).to.equal("Food");
    });
});
