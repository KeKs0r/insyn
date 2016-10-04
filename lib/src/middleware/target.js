const makeTargetMiddleware = fetcher => service => next => payload => {
    if(payload.action && payload.action.target){
        const target = fetcher(payload.action.target);
        const newPayload = Object.assign({}, payload, {target});
        const result =  next(newPayload);
        return Object.assign({}, result,{target});
    }
    return next(payload);
};

module.exports = makeTargetMiddleware;