import React from 'react';
import {expect} from "chai";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import RegistrationForm from '../../src/registration/containers/registrationForm';


describe("Registration Form", () => {

    const mockStore = configureStore([]);
    const store = mockStore({registrations: {status: "SUCCESS"}});

    describe("Render", () => {
        it("should render the registration form with proper fields", () => {
            const wrapper = mount(
                <Provider store = {store}>
                    <RegistrationForm />
                </Provider>
            );

            expect(wrapper.find("#title").text()).to.equal("New User Registration");

            expect(wrapper.find("#name").type()).to.equal("input");

            expect(wrapper.find("#mail").type()).to.equal("input");
            expect(wrapper.find("#mail").prop("type")).to.equal("email");

            expect(wrapper.find("#username").type()).to.equal("input");
            expect(wrapper.find("#username").prop("type")).to.equal("text");

            expect(wrapper.find("#password").type()).to.equal("input");
            expect(wrapper.find("#password").prop("type")).to.equal("password");

            expect(wrapper.find("#confirm-password").type()).to.equal("input");
            expect(wrapper.find("#confirm-password").prop("type")).to.equal("password");

            expect(wrapper.find("#address").type()).to.equal("input");
            expect(wrapper.find("#address").prop("type")).to.equal("text-area");

            expect(wrapper.find("#mobile").type()).to.equal("input");
            expect(wrapper.find("#mobile").prop("type")).to.equal("text");

            expect(wrapper.find("#submit").type()).to.equal("button");
            expect(wrapper.find("#submit").prop("type")).to.equal("submit");

            expect(wrapper.find("#cancel").type()).to.equal("button");
            expect(wrapper.find("#cancel").text()).to.equal("Cancel");
        });

        it("should render the user type control", () => {
            const wrapper = mount(
                <Provider store = {store}>
                    <RegistrationForm />
                </Provider>
            );

            let selectElement = wrapper.find("#userType");
            expect(selectElement.type()).to.equal("select");
            expect(selectElement.childAt(0).type()).to.equal("option");
            expect(selectElement.childAt(0).text()).to.equal("Buyer");
            expect(selectElement.childAt(0).prop("value")).to.equal("BUYER");
            expect(selectElement.childAt(1).type()).to.equal("option");
            expect(selectElement.childAt(1).text()).to.equal("Seller");
            expect(selectElement.childAt(1).prop("value")).to.equal("SELLER");
        });

        it("should render the gender and date of birth control", () => {
            const wrapper = mount(
                <Provider store = {store}>
                    <RegistrationForm />
                </Provider>
            );

            let selectElement = wrapper.find("#gender");
            expect(selectElement.type()).to.equal("select");
            expect(selectElement.childAt(0).type()).to.equal("option");
            expect(selectElement.childAt(0).text()).to.equal("Male");
            expect(selectElement.childAt(0).prop("value")).to.equal("MALE");
            expect(selectElement.childAt(1).type()).to.equal("option");
            expect(selectElement.childAt(1).text()).to.equal("Female");
            expect(selectElement.childAt(1).prop("value")).to.equal("FEMALE");

            expect(wrapper.find("#dob").type()).to.equal("input");
            expect(wrapper.find("#dob").prop("type")).to.equal("date");
        });

        it("should render the PAN and experience field for SELLER", () => {
            const wrapper = mount(
                <Provider store = {store}>
                    <RegistrationForm />
                </Provider>
            );

            wrapper.find("#userType").simulate("change", {target: { value: "SELLER" }});

            expect(wrapper.find("#pan").type()).to.equal("input");
            expect(wrapper.find("#pan").prop("type")).to.equal("text");

            expect(wrapper.find("#year").type()).to.equal("input");
            expect(wrapper.find("#months").type()).to.equal("input");
        });

        it("should hide the DoB and gender when user type is SELLER", () => {
            const wrapper = mount(
                <Provider store = {store}>
                    <RegistrationForm />
                </Provider>
            );

            wrapper.find("#userType").simulate("change", {target: { value: "SELLER" }});
            expect(wrapper.find("#dob").length).to.equal(0);
            expect(wrapper.find("#gender").length).to.equal(0);
        });

        it("should hide the PAN and Experience when user type is BUYER", () => {
            const wrapper = mount(
                <Provider store = {store}>
                    <RegistrationForm />
                </Provider>
            );

            wrapper.find("#userType").simulate("change", {target: { value: "BUYER" }});
            expect(wrapper.find("#pan").length).to.equal(0);
            expect(wrapper.find("#experience").length).to.equal(0);
        });

        it("should render the validation error message if validation errors exist", () => {
            const errors = new Map();
            errors.set("name", "may not empty");
            const storeWithErrors = mockStore({registrations: {validationErrors: errors}});
            const wrapper = mount(
                <Provider store = {storeWithErrors}>
                    <RegistrationForm />
                </Provider>
            );

            expect(wrapper.find("#error").length).to.equal(1);
            expect(wrapper.find("#error").text()).to.equal("may not empty");
        });

    })

});