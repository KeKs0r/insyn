const compose = require('./util/compose');
const transformMiddleware = require('./middleware/internal/transform');

const applyMiddleware = function applyMiddleware(...middlewares) {
    return (createService) => (logicUnit, enhancer) => {
        const baseService = createService(logicUnit, enhancer);
        const chain = compose(transformMiddleware, ...middlewares);
        return chain(baseService)
    };
};
module.exports = applyMiddleware;