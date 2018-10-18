import {expect} from 'chai';
import {mount} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../../src/header/components/header'
import {Navbar, NavItem} from 'react-bootstrap';
import GlobalConstants from '../../src/common/constants'

describe("Header", () => {

    describe("Render", () => {

        it("should render header with brand name", () => {
            const wrapper = mount(
                <Provider store={configureStore({})}>
                    <Header/>
                </Provider>
            );
            expect(wrapper.find(Navbar.Brand).text()).to.equals('Trade-Away');
        });

        it("should not render header with logout", () => {
            localStorage.removeItem(GlobalConstants.AUTH_TOKEN);

            const wrapper = mount(
                <Provider store={configureStore({})}>
                    <Header/>
                </Provider>
            );

            expect(wrapper.find(NavItem).length).to.equals(0);
        });

        it("should render header with logout button", () => {
            localStorage.setItem(GlobalConstants.AUTH_TOKEN, "TOKEN");
            const wrapper = mount(
                <Provider store={configureStore({})}>
                    <Header/>
                </Provider>
            );
            expect(wrapper.find(NavItem).length).to.equals(1);
        });

    });
});