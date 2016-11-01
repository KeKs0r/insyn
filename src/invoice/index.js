const { createService, enhancer, middleware, compose } = require('../../lib/src');
// const makeMemoryFetcher = require('../common/memoryFetcher');
// const makeFetchCustomerMiddleware = require('./middleware/fetchCustomer');
// const makeFetchItemsMiddleware = require('./middleware/fetchItems');


// const customerData = require('./test/fixtures/customer.json');
// const productData = require('./test/fixtures/products.json');

// const customerFetcherMiddleware = makeFetchCustomerMiddleware(makeMemoryFetcher(customerData));
// const itemsFetcherMiddleware = makeFetchItemsMiddleware(makeMemoryFetcher(productData));

const createInvoiceService = bus => {
    const { addSideDispatch, applyMiddleware } = enhancer;
    const { uuid, target, sidedispatch } = middleware;
    const InvoiceService = createService(
        compose(
            applyMiddleware(uuid, target, sidedispatch),
            addSideDispatch(bus)
        )
    );
    return InvoiceService;
};

module.exports = createInvoiceService;