const { actionSchema } = require('./createService');

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