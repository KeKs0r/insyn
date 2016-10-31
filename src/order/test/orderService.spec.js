const test = require('ava');
const expect = require('unexpected');

const { CREATE_ORDER } = require('../../constants');
const createOrderService = require('../index');

const action = {
    type: CREATE_ORDER,
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
const orderService = createOrderService(bus);

test('handles createOrder', () => {
    const result = orderService.handle(action);
    expect(result, 'to satisfy', {
        result: expect.it('to have key', 'prices'),
    });
});