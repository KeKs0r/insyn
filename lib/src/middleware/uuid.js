const uuid = require('uuid');
// @todo: Replace with Joi Validation
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const UuidMiddleware = service => next => payload => {
    assert(!payload.uuid, 'uuid already set');
    const newPayload = Object.assign({}, payload, { uuid: uuid.v1() });
    const result = next(newPayload);
    return result;
};

module.exports = UuidMiddleware;