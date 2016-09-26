const compose = require('../util/compose');
const transformMiddleware = require('../middleware/internal/transform');

const applyMiddleware = function applyMiddleware(...middlewares) {
    return (createService) => (handler, enhancer) => {
        const service = createService(handler, enhancer);
        const chain = [transformMiddleware, ...middlewares];
        const wrapMiddleware = compose(...chain);
        const consume = wrapMiddleware(service.consume);
        return Object.assign({}, service, {consume});
    };
};
module.exports = applyMiddleware;