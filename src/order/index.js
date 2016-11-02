// Framework
const {
    createService,
    enhancer: { addSideDispatch, applyMiddleware },
    middleware: { uuid, makeTargetMiddleware, sidedispatch },
    compose,
} = require('../../lib/src');


// Middleware
const makeMemoryStore = require('../../lib/src/util/memoryStore');
const makeFetchCustomerMiddleware = require('./middleware/fetchCustomer');
const makeFetchItemsMiddleware = require('./middleware/fetchItems');



// Handler
const { ACTIONS } = require('../constants');
const createOrderHandler = require('./handler/createOrder');
const confirmOrderHandler = require('./handler/confirmOrder');

const createOrderService = (bus, oStore, cStore, pStore) => {
    const store = oStore || makeMemoryStore();
    const customerStore = cStore || makeMemoryStore();
    const productStore = pStore || makeMemoryStore();

    const customerFetcherMiddleware = makeFetchCustomerMiddleware(customerStore);
    const itemsFetcherMiddleware = makeFetchItemsMiddleware(productStore);
    const targetMiddleware = makeTargetMiddleware(store);

    const OrderService = createService(
        compose(
            applyMiddleware(uuid, targetMiddleware, sidedispatch, customerFetcherMiddleware, itemsFetcherMiddleware),
            addSideDispatch(bus)
        )
    );
    OrderService.register(ACTIONS.ORDER.CREATE_ORDER, createOrderHandler);
    OrderService.register(ACTIONS.ORDER.CONFIRM_ORDER, confirmOrderHandler);

    return OrderService;
};

module.exports = createOrderService;