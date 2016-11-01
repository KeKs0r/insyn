const { actionSchema } = require('../createService');

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