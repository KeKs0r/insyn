const { actionSchema } = require('./createService');

const createApp = (bus, ...services) => {
    const handle = action => {
        actionSchema.validate(action);
        const result = services
            .filter(service => service.canHandle(action))
            .map(service => service.handle(action));
        result
            .filter(s => (s))
            .forEach(actionResult => {
                const resultType = `result:${actionResult.action.type}`;
                bus.emit(resultType, actionResult);
            });
        return result;
    };
    bus.onAny((event, action) => {
        if (event.indexOf('result:') === -1) {
            setTimeout(() => {
                handle(action);
            }, 0);

        }
    });
    return {
        handle,
        bus,
    };
};

module.exports = createApp;