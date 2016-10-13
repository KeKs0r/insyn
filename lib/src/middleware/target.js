const compose = require('../util/composeMiddleware');

// eslint-disable-next-line no-unused-vars
const makeFetchTargetMiddleware = fetcher => service => next => payload => {
    if (payload.action && payload.action.target) {
        const target = fetcher(payload.action.target);
        const newPayload = Object.assign({}, payload, { target });
        return next(newPayload);
    }
    return next(payload);
};

// eslint-disable-next-line no-unused-vars
const resultTargetMiddleware = service => next => payload => {
    if (payload.target) {
        const { target } = payload;
        const result = next(payload);
        return Object.assign({}, result, { target });
    }
    return next(payload);
};

const makeTargetMiddleware = fetcher => {
    const fetchTargetMiddleware = makeFetchTargetMiddleware(fetcher);
    const targetMiddleware = compose(fetchTargetMiddleware, resultTargetMiddleware);
    return targetMiddleware;
};

module.exports = makeTargetMiddleware;