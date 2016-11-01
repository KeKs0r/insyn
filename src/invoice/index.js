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
const createInvoiceHandler = require('./handler/createInvoice');
const { CREATE_INVOICE } = require('../constants');


const createInvoiceService = bus => {
    const InvoiceService = createService(
        compose(
            applyMiddleware(uuid, targetMiddleware, sidedispatch),
            addSideDispatch(bus)
        )
    );
    InvoiceService.register(CREATE_INVOICE, createInvoiceHandler);

    return InvoiceService;
};

module.exports = createInvoiceService;