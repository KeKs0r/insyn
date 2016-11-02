const Joi = require('joi');
const compose = require('../util/composeMiddleware');

const storeSchema = Joi.object().keys({
    get: Joi.func().arity(1),
    set: Joi.func().arity(2),
}).unknown();

const makeFetchTargetMiddleware = store => {
    storeSchema.validate(store);
    // eslint-disable-next-line no-unused-vars
    return service => next => payload => {
        if (payload.action && payload.action.target) {
            const target = store.get(payload.action.target);
            if (!target) {
                throw new Error(`Target not found: ${payload.action.target}`);
            }
            const newPayload = Object.assign({}, payload, { target });
            return next(newPayload);
        }
        return next(payload);
    };
}

const makeResultTargetMiddleware = store => {
    storeSchema.validate(store);
    // eslint-disable-next-line no-unused-vars
    return service => next => payload => {
        if (payload.target) {
            const { target } = payload;
            const resultPayload = next(payload);
            store.set(payload.target.id, resultPayload.result);
            return Object.assign({}, resultPayload, { target });
        }
        return next(payload);
    };
}

const makeTargetMiddleware = store => {
    const fetchTargetMiddleware = makeFetchTargetMiddleware(store);
    const resultTargetMiddleware = makeResultTargetMiddleware(store);
    const targetMiddleware = compose(fetchTargetMiddleware, resultTargetMiddleware);
    return targetMiddleware;
};

module.exports = makeTargetMiddleware;