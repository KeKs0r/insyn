const compose = require('../util/compose');
const transformActionMiddleware = require('../middleware/internal/transformAction');
const transformResultMiddleware = require('../middleware/internal/transformResult');

const applyMiddleware = function applyMiddleware(...middlewares) {
    return (createService) => (handler, enhancer) => {
        const service = createService(handler, enhancer);
        const chain = [transformActionMiddleware, ...middlewares, transformResultMiddleware];
        const injected = chain.map(middleware => middleware(service));
        const wrapMiddleware = compose(...injected);

        const consume = wrapMiddleware(service.consume);
        return Object.assign({}, service, {consume});
    };
};
module.exports = applyMiddleware;