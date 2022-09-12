const password = (value, helpers) => {
    if(!value.match(/\d/) || !value.match(/a-zA-Z/)){
        return helpers.message('Password invalid');
    }
    return value;
}

const passwordStrong = (value, helpers) => {
    if(!value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)){
        return helpers.message('Password invalid');
    }
    return value;
}



const objectId =  (value, helpers) => {
    if(!value.match(/[0-9a-fA-F]{24}/)){
        return helpers.message(`${value} non-Objectid`);
    }
    return value;
}

module.exports = {
    password,
    passwordStrong,
    objectId
}