import React from "react";
import {expect} from "chai";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import AppError from "../../src/common/appError";
import LoginForm from '../../src/login/containers/loginForm';

describe("Login Form", () => {

    const mockStore = configureStore();
    it("should render login form with username/password fields", () => {
        const wrapper = mount(
            <Provider store = {mockStore({logins: {}})}>
                <LoginForm />
            </Provider>
        );

        expect(wrapper.find(AppError).length).to.equals(0); //no error

        expect(wrapper.find("#username").type()).to.equal("input");
        expect(wrapper.find("#username").prop("type")).to.equal("text");
        expect(wrapper.find("#password").type()).to.equal("input");
        expect(wrapper.find("#password").prop("type")).to.equal("password");
        expect(wrapper.find("#newUser").prop("type")).to.equal("button");
    });

    it("should render error", () => {
        let storeWithError = mockStore({logins: {status: "ERROR"}});
        const wrapper = mount(
            <Provider store = {storeWithError}>
                <LoginForm />
            </Provider>
        );

        expect(wrapper.find(AppError).length).to.equals(1);
    });
});