import {expect} from "chai";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";

import Password from "../../src/common/password";
import FieldGroup from "../../src/common/fieldGroup";

describe("Confirm Password", () => {
    const mockStore = configureStore();
    const store = mockStore({});

    describe("Rendering", () => {
        it("should render password and retype password fields", () => {
            const wrapper = mount(
                <Provider store = {store}>
                    <Password onChange = { () => {} } />
                </Provider>
            );

            expect(wrapper.find(FieldGroup).length).to.equal(2);

            const password = wrapper.find(FieldGroup).at(0);
            expect(password.prop('label')).to.equal('Password');
            expect(password.prop('id')).to.equal('password');
            expect(password.prop('type')).to.equal('password');

            const retypePassword = wrapper.find(FieldGroup).at(1);
            expect(retypePassword.prop('label')).to.equal('Confirm Password');
            expect(retypePassword.prop('id')).to.equal('confirm-password');
            expect(retypePassword.prop('type')).to.equal('password');
        });

        it("should render password not matching error when password and retype-password fields are not matching", () => {
            const wrapper = mount(
                <Provider store = { store }>
                    <Password onChange = { () => {} } />
                </Provider>
            );

            wrapper.find("#password").simulate('change', {target: {value: "ABC"}});
            wrapper.find("#confirm-password").simulate('change', {target: {value: "ABCD"}});

            const error = wrapper.find("#error");
            expect(error.length).to.eql(1);
            expect(error.text()).to.equal("Password and confirm password do not match");
        });

    });

});
