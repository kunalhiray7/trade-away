import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FieldGroup from '../../common/fieldGroup';
import Password from '../../common/password';
import AppError from '../../common/appError';

export default class RegistrationForm extends Component {

    constructor() {
        super();
        this.state = {
            showBuyerProps: true
        };
        this.registration = {userType:"BUYER", gender:"MALE"};
    }

    onUserTypeChange(e) {
        const userType = e.target.value;
        if (userType === "SELLER") {
            this.setState({
                showBuyerProps: false
            });
        } else {
            this.setState({
                showBuyerProps: true
            });
        }
        this.registration.userType = userType;
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log("Registration::", this.registration);
        this.props.onRegistration(this.registration);
    }

    cancel(e) {
        e.preventDefault();
        this.props.navigateToLogin();
    }

    onChangeValue(e, attribute) {
        this.registration[attribute] = e.target.value;
    }

    onChangePassword(password) {
        this.registration["password"] = password.value;
        this.setState({
            passwordValidationError: ""
        });
    }

    render() {
        return (
            <div className="container" style={{maxWidth: '50%'}}>
                { this.props.error ? <AppError errorMessage = { this.props.error } /> : null}
                <h1 id="title">New User Registration</h1>
                <form>
                    <FieldGroup
                        id="name"
                        type="text"
                        label="Name"
                        onChange={e => this.onChangeValue(e, "name")}
                        error={this.props.validationErrors ? this.props.validationErrors.get("name") : undefined}
                    />
                    <FieldGroup
                        id="mail"
                        type="email"
                        label="Email ID"
                        onChange={e => this.onChangeValue(e, "email")}
                        error={this.props.validationErrors ? this.props.validationErrors.get("email") : undefined}
                    />
                    <FieldGroup
                        id="username"
                        type="text"
                        label="User Name"
                        onChange={e => this.onChangeValue(e, "username")}
                        error={this.props.validationErrors ? this.props.validationErrors.get("username") : undefined}
                    />
                    <Password
                        error = { this.props.validationErrors ? this.props.validationErrors.get("password") : undefined}
                        onChange = { (password) => { this.onChangePassword(password) } }
                    />
                    <FieldGroup
                        id="address"
                        type="text-area"
                        label="Address"
                        onChange={e => this.onChangeValue(e, "address")}
                        error={this.props.validationErrors ? this.props.validationErrors.get("address") : undefined}
                    />
                    <FieldGroup
                        id="mobile"
                        type="text"
                        label="Mobile"
                        onChange={e => this.onChangeValue(e, "mobileNo")}
                        error={this.props.validationErrors ? this.props.validationErrors.get("mobileNo") : undefined}
                    />

                    <FormGroup>
                        <ControlLabel>Type</ControlLabel>
                        <FormControl id="userType" componentClass="select" placeholder="select"
                                     onChange={(e) => this.onUserTypeChange(e)}>
                            <option value="BUYER">Buyer</option>
                            <option value="SELLER">Seller</option>
                        </FormControl>
                    </FormGroup>

                    {this.state.showBuyerProps &&
                    <div>
                        <FormGroup>
                            <ControlLabel>Gender</ControlLabel>
                            <FormControl id="gender" componentClass="select" placeholder="select"
                                         onChange={(e) => this.onChangeValue(e, "gender")}>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </FormControl>
                        </FormGroup>

                        <FieldGroup
                            id="dob"
                            type="date"
                            label="DoB"
                            onChange={e => this.onChangeValue(e, "dateOfBirth")}
                        />
                    </div>}
                    {!this.state.showBuyerProps &&
                    <div>
                        <FieldGroup
                            id="pan"
                            type="text"
                            label="PAN"
                            onChange={e => this.onChangeValue(e, "pan")}
                            error={this.props.validationErrors ? this.props.validationErrors.get("pan") : undefined}
                        />

                        <FormGroup id="experience">
                            <FieldGroup
                                id="year"
                                type="number"
                                label="Year"
                                onChange={e => this.onChangeValue(e, "experienceInYears")}
                                error={this.props.validationErrors ? this.props.validationErrors.get("experienceInYears") : undefined}
                            />
                            <FieldGroup
                                id="months"
                                type="number"
                                label="Months"
                                onChange={e => this.onChangeValue(e, "experienceInMonths")}
                                error={this.props.validationErrors ? this.props.validationErrors.get("experienceInMonths") : undefined}
                            />
                        </FormGroup>
                    </div>
                    }

                    <Button className="pull-right" id="submit" bsStyle="primary" type="submit"
                            onClick={(e) => this.onFormSubmit(e)}>
                        Submit
                    </Button>
                    <Button className="pull-right" id="cancel" onClick={(e) => this.cancel(e)}>
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }
}