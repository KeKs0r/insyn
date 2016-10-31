const Joi = require('joi');

const actionSchema = Joi.object().keys({
    type: Joi.string().min(3).required(),
}).unknown();

const createApp = (...services) => {
    const handle = action => {
        actionSchema.validate(action);
        services.forEach(service => {
            service.handle(action);
        });
    };
    return {
        handle,
    };
};

module.exports = createApp;