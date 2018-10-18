import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import AppError from '../../src/common/appError';

describe("App Error", () => {

    it("should render the error with given message", () => {
        const wrapper = shallow(<AppError errorMessage="Error occurred" />);

        expect(wrapper.find("Glyphicon").length).to.equal(1);
        expect(wrapper.find("#error").childAt(1).text()).to.equal("Error occurred");
    });

});