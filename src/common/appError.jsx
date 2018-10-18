import React, {Component} from 'react';
import {Alert, Glyphicon} from 'react-bootstrap';

export default class AppError extends Component {
    render() {
        return (
            <Alert bsStyle = "danger">
                <p id="error">
                    <Glyphicon glyph = "exclamation-sign" />
                    { this.props.errorMessage }
                </p>
            </Alert>
        )
    }
}