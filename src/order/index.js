const { createService, applyMiddleware } = require('../lib/src');
//const { TargetMiddleware } = require('../lib/TargetMiddleware');
const core = require('./core');

const OrderService = createService(
    core,
    // applyMiddleware(TargetMiddleware)
);


