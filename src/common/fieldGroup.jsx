import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
const FieldGroup = ({id, label, help, error, ...props}) => {

    const errorStyle = {
        color: '#d9534f'
    };

    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
            {error && <label id="error" style={errorStyle}>{error}</label>}
        </FormGroup>
    )
};

export default FieldGroup;