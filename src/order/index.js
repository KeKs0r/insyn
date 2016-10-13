const { createService, enhancer, middleware, compose } = require('../../lib/src');

const createOrderService = bus => {
    const { addSideDispatch, applyMiddleware } = enhancer;
    const { uuid, target, sidedispatch } = middleware;
    const OrderService = createService(
        compose(
            applyMiddleware(uuid, target, sidedispatch),
            addSideDispatch(bus)
        )
    );
    return OrderService;
};

module.exports = createOrderService;



