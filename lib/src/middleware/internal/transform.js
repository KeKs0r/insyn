/**
 * Transforms simple action to object with action key
 * (action) => ({action})
 * @param next
 * @constructor
 */
const TransformMiddleware = service => next => action => {
    const newPayload = Object.assign({}, {action});
    const result = next(newPayload);
    return result;
};

module.exports = TransformMiddleware;