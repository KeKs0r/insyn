// @todo: Replace with Joi Validation
const assert = require('assert');
const UuidMiddleware = service => next => payload => {
    assert(!payload.uuid, 'uuid already set');
    const newPayload = Object.assign({}, payload, {uuid:makeId()});
    const result = next(newPayload);
    return result;
};

const makeId = () => {
    return Math.ceil(Math.random() * 999999999);
};

module.exports = UuidMiddleware;