// eslint-disable-next-line no-unused-vars
const makeMockMiddleware = spy => service => next => payload => {
    const { action } = payload;
    spy(action);
    const result = next(Object.assign({}, payload, { mockMiddleware: true }));
    spy(result);
    return result;
};

module.exports = makeMockMiddleware;