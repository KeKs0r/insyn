const compose = require('../util/compose');
const transformMiddleware = require('../middleware/internal/transform');

const applyMiddleware = function applyMiddleware(...middlewares) {
    return (createService) => (handler, enhancer) => {
        const service = createService(handler, enhancer);
        const chain = [transformMiddleware, ...middlewares]
        const injected = chain.map(middleware => middleware(service));
        const wrapMiddleware = compose(...injected);

        const consume = wrapMiddleware(service.consume);
        return Object.assign({}, service, {consume});
    };
};
module.exports = applyMiddleware;