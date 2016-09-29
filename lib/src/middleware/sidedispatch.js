const Joi = require('joi');

const actionSchema =  Joi.object().keys({
    uuid: Joi.string().guid().required()
}).unknown();

const serviceSchema = Joi.object().keys({
    dispatch: Joi.func().required(),
}).unknown();


const SideDispatchMiddleware = service => {
    Joi.assert(service, serviceSchema, 'Sidedispatch enhancer seems to be missing');
    return next => payload => {
        const push = (sideaction) => {
            Joi.assert(payload, actionSchema, 'uuid middleware seems to be missing');
            const sidepayload = Object.assign({},sideaction, {source:payload.uuid});
            service.dispatch(sidepayload);
        }
        return next(Object.assign({}, payload, {push}));
    };
}

module.exports = SideDispatchMiddleware;