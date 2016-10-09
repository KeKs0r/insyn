const Joi = require('joi');

const actionSchema = Joi.object().keys({
    type: Joi.string().min(3).required(),
}).unknown();

const addSideDispatch = function addSideDispatch(emitter) {
    return createService => (handler, enhancer) => {
        const service = createService(handler, enhancer);
        const dispatch = action => {
            actionSchema.validate(action);
            emitter.emit(action.type, action);
        };
        return Object.assign({}, service, { dispatch });
    };
};

module.exports = addSideDispatch;