const compose = require('../util/compose');
/*
 * @TODO: Get Diff Function from ReduxDevTools
 */
const _diff = (orig, change) => {
    let diff = [];
    const keys = Object.getOwnPropertyNames(orig);
    keys.forEach((key) => {
        if (!change[key]) {
            diff.push({key, oldValue: orig[key], newValue: "NULL"});
        }
        if(change[key] && change[key] !== orig[key]){
            diff.push({key, oldValue: orig[key], newValue: change[key]});
        }
    });
    return diff;
};

const makeFetchTargetMiddleware = fetcher => service => next => payload => {
    if (payload.action && payload.action.target) {
        const target = fetcher(payload.action.target);
        const newPayload = Object.assign({}, payload, {target});
        const result = next(newPayload);
        return Object.assign({}, result, {target});
    }
    return next(payload);
};

const diffTargetMiddleware = service => next => payload => {
    if (payload.target) {
        const result = next(payload);
        const targetDiff = _diff(payload.target, result.result);
        return Object.assign({}, result, {targetDiff});
    }
};

const makeTargetMiddleware = fetcher => {
    const fetchTargetMiddleware = makeFetchTargetMiddleware(fetcher);
    const targetMiddleware = compose(fetchTargetMiddleware, diffTargetMiddleware);
    return targetMiddleware;
}

module.exports = makeTargetMiddleware;