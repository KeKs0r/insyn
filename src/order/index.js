// Framework
const {
    createService,
    enhancer: { addSideDispatch, applyMiddleware },
    middleware: { uuid, makeTargetMiddleware, sidedispatch },
    compose,
} = require('../../lib/src');

// Fixtures
const customerData = require('./test/fixtures/customer.json');
const productData = require('./test/fixtures/products.json');

// Middleware
const makeMemoryStore = require('../../lib/src/util/memoryStore');
const makeFetchCustomerMiddleware = require('./middleware/fetchCustomer');
const makeFetchItemsMiddleware = require('./middleware/fetchItems');

const customerFetcherMiddleware = makeFetchCustomerMiddleware(makeMemoryStore(customerData));
const itemsFetcherMiddleware = makeFetchItemsMiddleware(makeMemoryStore(productData));
const targetMiddleware = makeTargetMiddleware(makeMemoryStore());

// Handler
const { ACTIONS } = require('../constants');
const createOrderHandler = require('./handler/createOrder');



const createOrderService = bus => {
    const OrderService = createService(
        compose(
            applyMiddleware(uuid, targetMiddleware, sidedispatch, customerFetcherMiddleware, itemsFetcherMiddleware),
            addSideDispatch(bus)
        )
    );
    OrderService.register(ACTIONS.ORDER.CREATE_ORDER, createOrderHandler);

    return OrderService;
};

module.exports = createOrderService;