const test = require('ava');
const expect = require('unexpected');
const _ = require('lodash');


const { EventEmitter2 } = require('eventemitter2');
const { ACTIONS, STATUS } = require('../../src/constants');
const createOrderService = require('../../src/order');
const createInvoiceService = require('../../src/invoice');
const { MemoryStore, createApp } = require('../../lib/src');

const customerFixtures = require('../fixtures/customer.json');
const productFixtures = require('../fixtures/products.json');

const invoiceStore = new MemoryStore({}, 'invoice');
const orderStore = new MemoryStore({}, 'order');
const customerStore = new MemoryStore(customerFixtures, 'customer');
const productStore = new MemoryStore(productFixtures, 'product');

const bus = new EventEmitter2({ wildcard: true });

const orderService = createOrderService(bus, orderStore, customerStore, productStore);
const invoiceService = createInvoiceService(bus, invoiceStore);

const app = createApp(bus, orderService, invoiceService);

const process = require('../fixtures/first');

test.serial('1. createOrder: Order + Invoice', () => {
    app.handle(process[ACTIONS.ORDER.CREATE_ORDER]);


    expect(_.size(orderStore.getAll()), 'to be', 1);
    const order = _.head(_.map(orderStore.getAll(), c => c));
    expect(order, 'to satisfy', {
        status: STATUS.ORDER.OPEN,
    });


    expect(_.size(invoiceStore.getAll()), 'to be', 1);
    const invoice = _.head(_.map(invoiceStore.getAll(), c => c));
    expect(invoice, 'to satisfy', {
        status: STATUS.INVOICE.OPEN,
    });

});