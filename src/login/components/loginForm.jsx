import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import FieldGroup from '../../common/fieldGroup';
import AppError from '../../common/appError';

export default class LoginForm extends Component {

    constructor() {
        super();
        this.loginForm = {};
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.onLoginAttempt(this.loginForm);
    }

    onChangeValue(e, attribute) {
        this.loginForm[attribute] = e.target.value;
    }

    registerNewUser(e) {
        e.preventDefault();
        this.props.registerNewUser();
    }

    render() {
        return (
            <div className="container" style={{maxWidth: '40%'}}>
                {this.props.status === "ERROR" &&
                <AppError errorMessage="Unable to login, please check your credentials!"/>
                }
                <form>
                    <FieldGroup
                        id="username"
                        type="text"
                        label="User Name"
                        onChange={e => this.onChangeValue(e, "username")}
                    />
                    <FieldGroup
                        id="password"
                        type="password"
                        label="Password"
                        onChange={e => this.onChangeValue(e, "password")}
                    />

                    <Button bsStyle="primary" type="submit" onClick={(e) => this.onFormSubmit(e)}>
                        Login
                    </Button>
                    <Button id="newUser" className="pull-right" onClick={(e) => this.registerNewUser(e)}>
                        New User Registration
                    </Button>
                </form>
            </div>
        );
    }
}