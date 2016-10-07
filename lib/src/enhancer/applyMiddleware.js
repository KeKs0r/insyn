const composeMiddleware = require('../util/composeMiddleware');
const transformActionMiddleware = require('../middleware/internal/transformAction');
const transformResultMiddleware = require('../middleware/internal/transformResult');

const applyMiddleware = function applyMiddleware(...middlewares) {
    return (createService) => (handler, enhancer) => {
        const service = createService(handler, enhancer);
        const chain = [transformActionMiddleware, ...middlewares, transformResultMiddleware];
        const wrapMiddleware = composeMiddleware(...chain)(service);

        const consume = wrapMiddleware(service.consume);
        return Object.assign({}, service, {consume});
    };
};
module.exports = applyMiddleware;