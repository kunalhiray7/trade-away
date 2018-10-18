const mapErrors = (validationErrors) => {
    let map = new Map();
    validationErrors.errors.map((error) => {
        map.set(error.field, error.defaultMessage)
    });
    return map;
};

export default mapErrors;