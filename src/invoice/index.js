// Framework
const {
    createService,
    enhancer: { addSideDispatch, applyMiddleware },
    middleware: { uuid, makeTargetMiddleware, sidedispatch },
    compose,
    memoryStore,
} = require('../../lib/src');

// Middleware
const makeMemoryFetcher = memoryStore;


// Handler
const { ACTIONS } = require('../constants');
const createInvoiceHandler = require('./handler/createInvoice');
const payInvoiceHandler = require('./handler/payInvoice');


const createInvoiceService = (bus, store) => {
    const targetMiddleware = makeTargetMiddleware(store || makeMemoryFetcher());
    const InvoiceService = createService(
        compose(
            applyMiddleware(uuid, targetMiddleware, sidedispatch),
            addSideDispatch(bus)
        )
    );
    InvoiceService.register(ACTIONS.INVOICE.CREATE_INVOICE, createInvoiceHandler);
    InvoiceService.register(ACTIONS.INVOICE.PAY_INVOICE, payInvoiceHandler);

    return InvoiceService;
};

module.exports = createInvoiceService;