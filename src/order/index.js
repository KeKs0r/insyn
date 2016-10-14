const { createService, enhancer, middleware, compose } = require('../../lib/src');
const makeMemoryFetcher = require('../common/memoryFetcher');
const makeFetchCustomerMiddleware = require('./middleware/fetchCustomer');
const makeFetchItemsMiddleware = require('./middleware/fetchItems');


const customerData = require('./test/fixtures/customer.json');
const productData = require('./test/fixtures/products.json');

const customerFetcherMiddleware = makeFetchCustomerMiddleware(makeMemoryFetcher(customerData));
const itemsFetcherMiddleware = makeFetchItemsMiddleware(makeMemoryFetcher(productData));

const createOrderService = bus => {
    const { addSideDispatch, applyMiddleware } = enhancer;
    const { uuid, target, sidedispatch } = middleware;
    const OrderService = createService(
        compose(
            applyMiddleware(uuid, target, sidedispatch, customerFetcherMiddleware, itemsFetcherMiddleware),
            addSideDispatch(bus)
        )
    );
    return OrderService;
};

module.exports = createOrderService;