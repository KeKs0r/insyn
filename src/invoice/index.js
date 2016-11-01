// Framework
const {
    createService,
    enhancer: { addSideDispatch, applyMiddleware },
    middleware: { uuid, makeTargetMiddleware, sidedispatch },
    compose,
} = require('../../lib/src');

// Middleware
const makeMemoryFetcher = require('../common/memoryFetcher');


const targetMiddleware = makeTargetMiddleware(makeMemoryFetcher());

// Handler
const { ACTIONS } = require('../constants');
const createInvoiceHandler = require('./handler/createInvoice');


const createInvoiceService = bus => {
    const InvoiceService = createService(
        compose(
            applyMiddleware(uuid, targetMiddleware, sidedispatch),
            addSideDispatch(bus)
        )
    );
    InvoiceService.register(ACTIONS.INVOICE.CREATE_INVOICE, createInvoiceHandler);

    return InvoiceService;
};

module.exports = createInvoiceService;