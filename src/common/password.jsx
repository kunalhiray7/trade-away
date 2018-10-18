import React, {Component} from "react";
import FieldGroup from "./fieldGroup";

export default class Password extends Component {

    constructor(props) {
        super(props);
        this.model = {};
        this.state = {
            error: ""
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            validationError: props.error
        });
    }

    update(e, property) {
        this.model[property] = e.target.value;
        let isMatching = this.arePasswordsTypedIn() && this.arePasswordsMatching();
        let error = isMatching ? undefined : "Password and confirm password do not match";
        this.setState({
            error: error
        });
        this.props.onChange({isMatching: isMatching, value: (isMatching ? this.model.password : "")});
    }

    arePasswordsTypedIn() {
        return !!this.model.password && !!this.model.confirmPassword;
    }

    arePasswordsMatching() {
        return this.model.password === this.model.confirmPassword;
    }

    render() {
        return (
            <div>
                <FieldGroup
                    id="password"
                    type="password"
                    label="Password"
                    error = { this.props.validationError }
                    onChange={ e => this.update(e, "password") }
                />
                <FieldGroup
                    id="confirm-password"
                    type="password"
                    label="Confirm Password"
                    error = { this.state.error }
                    onChange={ e => this.update(e, "confirmPassword") }
                />
            </div>
        );
    }
}
