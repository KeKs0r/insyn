const compose = require('./compose');
const composeMiddleware = (...middlewares) => service => {
    const injected = middlewares.map(middleware => middleware(service));
    return compose(...injected);
};
module.exports = composeMiddleware;