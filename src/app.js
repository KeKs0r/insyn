const createOrderService = require('./order');
const createInvoiceService = require('./invoice');
const { EventEmitter2 } = require('eventemitter2');
const createApp = require('../lib/src/createApp');

const init = () => {
  const em = new EventEmitter2();
  const orderService = createOrderService(em);
  const invoiceService = createInvoiceService(em);
  return createApp(em, orderService, invoiceService);
};
module.exports = init;