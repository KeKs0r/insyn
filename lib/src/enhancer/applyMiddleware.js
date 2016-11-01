const composeMiddleware = require('../util/composeMiddleware');
const transformActionMiddleware = require('../middleware/internal/transformAction');
const transformResultMiddleware = require('../middleware/internal/transformResult');

const applyMiddleware = function applyMiddleware(...middlewares) {
    return createService => enhancer => {
        const service = createService(enhancer);
        const chain = [transformActionMiddleware, ...middlewares, transformResultMiddleware];
        const wrapMiddleware = composeMiddleware(...chain)(service);

        const handle = wrapMiddleware(service.handle);
        return Object.assign({}, service, { handle });
    };
};
module.exports = applyMiddleware;