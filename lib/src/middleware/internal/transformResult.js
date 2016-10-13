/**
 * Transforms simple handler result to object with result key
 * (result) => ({result})
 */

// eslint-disable-next-line no-unused-vars
const TransformResultMiddleware = service => next => payload => {
    const result = next(payload);
    const newResult = Object.assign({}, { result });
    return newResult;
};

module.exports = TransformResultMiddleware;