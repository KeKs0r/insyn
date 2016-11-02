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

    const handle = function createServiceHandle(action) {
        const a = action.action || action;
        Joi.attempt(a, actionSchema);
        const type = a.type;
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