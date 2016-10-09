/**
 * Transforms simple action to object with action key
 * (action) => ({action})
 * @param next
 * @constructor
 */
// eslint-disable-next-line no-unused-vars
const TransformActionMiddleware = service => next => action => {
    const newPayload = Object.assign({}, { action });
    const result = next(newPayload);
    return Object.assign({}, result, { action });
};

module.exports = TransformActionMiddleware;