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
const makeMemoryFetcher = require('../common/memoryFetcher');
const makeFetchCustomerMiddleware = require('./middleware/fetchCustomer');
const makeFetchItemsMiddleware = require('./middleware/fetchItems');

const customerFetcherMiddleware = makeFetchCustomerMiddleware(makeMemoryFetcher(customerData));
const itemsFetcherMiddleware = makeFetchItemsMiddleware(makeMemoryFetcher(productData));
const targetMiddleware = makeTargetMiddleware(makeMemoryFetcher());

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