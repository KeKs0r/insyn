// Framework
const { createService, enhancer, middleware, compose } = require('../../lib/src');
const { addSideDispatch, applyMiddleware } = enhancer;
const { uuid, makeTargetMiddleware, sidedispatch } = middleware;

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
const createOrderHandler = require('./handler/createOrder');
const { CREATE_ORDER } = require('../constants');


const createOrderService = bus => {
    const OrderService = createService(
        compose(
            applyMiddleware(uuid, targetMiddleware, sidedispatch, customerFetcherMiddleware, itemsFetcherMiddleware),
            addSideDispatch(bus)
        )
    );
    OrderService.register(CREATE_ORDER, createOrderHandler);

    return OrderService;
};

module.exports = createOrderService;