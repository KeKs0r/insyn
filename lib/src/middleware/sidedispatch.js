const Joi = require('joi');
const composeMiddleware = require('../util/composeMiddleware');

const actionSchema = Joi.object().keys({
    uuid: Joi.string().guid().required(),
}).unknown();

const serviceSchema = Joi.object().keys({
    dispatch: Joi.func().required(),
}).unknown();

const pushedActions = {};

const SideDispatchProviderMiddleware = service => {
    Joi.assert(service, serviceSchema, 'Sidedispatch enhancer seems to be missing');
    return next => payload => {
        const push = sideaction => {
            Joi.assert(payload, actionSchema, 'uuid middleware seems to be missing');
            const sidepayload = Object.assign({}, sideaction, { source: payload.uuid });
            if (pushedActions[payload.uuid]) {
                pushedActions[payload.uuid].push(sidepayload);
            } else {
                pushedActions[payload.uuid] = [sidepayload];
            }
            service.dispatch(sidepayload);
        };
        return next(Object.assign({}, payload, { push }));
    };
};

// eslint-disable-next-line no-unused-vars
const SideDispatchResultMiddleware = service => next => payload => {
    const result = next(payload);
    if (payload.uuid && pushedActions[payload.uuid]) {
        const newResult = Object.assign({}, result, { sideactions: pushedActions[payload.uuid] });
        delete pushedActions[payload.uuid];
        return newResult;
    }
    return result;
};


/*
 * @dependency enhancer:sidedispatch middleware:uuid
 */
const SideDispatchMiddleware = composeMiddleware(SideDispatchProviderMiddleware, SideDispatchResultMiddleware);


module.exports = SideDispatchMiddleware;