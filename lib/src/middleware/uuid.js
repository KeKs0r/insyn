const uuidGen = require('uuid');
// @todo: Replace with Joi Validation
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const UuidMiddleware = service => next => payload => {
    assert(!payload.uuid, 'uuid already set');
    const uuid = uuidGen.v1();
    const newPayload = Object.assign({}, payload, { uuid });
    const result = next(newPayload);
    return Object.assign({}, result, { uuid });
};

module.exports = UuidMiddleware;