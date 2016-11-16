const { actionSchema } = require('./createService');

const createApp = (bus, ...services) => {
    const handle = action => {
        actionSchema.validate(action);
        const result = services
            .filter(service => service.canHandle(action))
            .map(service => service.handle(action));
        return result;
    };
    bus.onAny((event, action) => {
        handle(action);
    });
    return {
        handle,
    };
};

module.exports = createApp;