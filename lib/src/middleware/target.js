const makeTargetMiddleware = fetcher => service => next => payload => {
    if(payload.action && payload.action.target){
        const target = fetcher(payload.action.target);
        const newPayload = Object.assign({}, payload, {target});
        return next(newPayload);
    }
    return next(payload);
};

module.exports = makeTargetMiddleware;