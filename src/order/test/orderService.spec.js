const test = require('ava');
const expect = require('unexpected');

const { ACTIONS } = require('../../constants');
const createOrderService = require('../index');
const { memoryStore } = require('../../../lib/src');

const customerStore = memoryStore(require('./fixtures/customer.json'));
const productStore = memoryStore(require('./fixtures/products.json'));

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
const orderService = createOrderService(bus, memoryStore(), customerStore, productStore);

test('handles createOrder', () => {
    const result = orderService.handle(action);
    expect(result, 'to satisfy', {
        result: expect.it('to have key', 'prices'),
    });
});