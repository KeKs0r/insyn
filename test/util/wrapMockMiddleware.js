const wrapMockMiddleware = middleware => {
    const service = {};
    const withService = middleware(service);
    const next = payload => ({ payload });
    return withService(next);
};
module.exports = wrapMockMiddleware;