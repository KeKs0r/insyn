/**
 * Transforms simple action to object with action key
 * (action) => ({action})
 * @param next
 * @constructor
 */
const TransformMiddleware = next => payload => {
    const newPayload = Object.assign({}, {action:payload});
    const result = next(newPayload);
    return result;
};

module.exports = TransformMiddleware;