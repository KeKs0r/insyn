const Joi = require('joi');

const actionSchema = Joi.object().keys({
    type: Joi.string().min(3).required(),
}).unknown();

const createService = enhancer => {
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.');
        }
        return enhancer(createService)();
    }

    const handlers = {};
    const register = (type, handler) => {
        if (handlers[type]) {
            throw new Error(`Handler for ${type} already defined`);
        }
        handlers[type] = handler;
    };

    const handle = action => {
        actionSchema.validate(action);
        const type = (action.action) ? action.action.type : action.type;
        if (handlers[type]) {
            return handlers[type](action);
        }
        return {};
    };
    return {
        register,
        handle,
    };
};

createService.actionSchema = actionSchema;

module.exports = createService;