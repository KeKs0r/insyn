const test = require('ava');
const expect = require('unexpected');

const { ACTIONS } = require('../../constants');
const createOrderService = require('../index');
const { MemoryStore } = require('../../../lib/src');

const customerFixtures = require('./fixtures/customer.json');
const productFixtures = require('./fixtures/products.json');
const customerStore = new MemoryStore(customerFixtures);
const productStore = new MemoryStore(productFixtures);

const action = {
    type: ACTIONS.ORDER.CREATE_ORDER,
    customer: 15,
    items: [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 },
    ],
};
const bus = {
    emit: () => {
    },
};
const orderService = createOrderService(bus, new MemoryStore(), customerStore, productStore);

test('handles createOrder', () => {
    const result = orderService.handle(action);
    expect(result, 'to satisfy', {
        result: expect.it('to have key', 'prices'),
    });
});