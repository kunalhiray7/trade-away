import React, {Component} from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import Constants from '../../common/constants'

export default class Header extends Component {

    logout(e) {
        e.preventDefault();
        this.props.onLogout();
    }

    renderSignedUserOptions() {
        if (localStorage.getItem(Constants.AUTH_TOKEN)) {
            return (
                <Nav pullRight={true}>
                    <NavItem onClick={e => this.logout(e)}>Logout</NavItem>
                </Nav>
            );
        }
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>Trade-Away</Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                {this.renderSignedUserOptions()}
            </Navbar>
        );
    }
}