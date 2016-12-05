const { EventEmitter2 } = require('eventemitter2');
const createOrderService = require('../../src/order');
const createInvoiceService = require('../../src/invoice');
const { MemoryStore, createApp } = require('../../lib/src');

const customerFixtures = require('../fixtures/customer.js');
const productFixtures = require('../fixtures/products.js');

const invoiceStore = new MemoryStore({}, 'invoice');
const orderStore = new MemoryStore({}, 'order');
const customerStore = new MemoryStore(customerFixtures, 'customer');
const productStore = new MemoryStore(productFixtures, 'product');

const bus = new EventEmitter2({ wildcard: true, delimiter: ':' });

const orderService = createOrderService(bus, orderStore, customerStore, productStore);
const invoiceService = createInvoiceService(bus, invoiceStore);

const app = createApp(bus, orderService, invoiceService);

module.exports = {
    app,
    invoiceStore,
    orderStore,
    customerStore,
    productStore,
    orderService,
    invoiceService,
    bus,
};