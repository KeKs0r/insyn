const { actionSchema } = require('./createService');


const createApp = (bus, ...services) => {
    const handle = action => {
        actionSchema.validate(action);
        const result = services.map(service => service.handle(action));
        return result;
    };
    bus.on('*', handle);
    return {
        handle,
    };
};

module.exports = createApp;