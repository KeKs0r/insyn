const createOrderService = require('./order');
const createInvoiceService = require('./invoice');
const { EventEmitter } = require('events');
const createApp = require('../lib/src/createApp');

const init = () => {
    const em = new EventEmitter();
    createOrderService(em);
    createInvoiceService(em);
    return createApp(em);
};
module.exports = init;