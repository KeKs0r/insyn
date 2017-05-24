const test = require('ava');
const expect = require('unexpected');

const { ACTIONS, STATUS } = require('../../../constants');
const makeOrderService = require('../../index');
const { noop } = require('lodash');
const { MemoryStore } = require('../../../../lib/src');

const orderFixtures = {
    1: {
        id: 1,
        status: STATUS.ORDER.OPEN,
        customer: 1,
        items: [
            { id: 1, quantity: 2 },
            { id: 2, quantity: 2 },
        ],
    },
};
const store = new MemoryStore(Object.assign({}, orderFixtures));


const bus = {
    emit: noop,
};
const OrderService = makeOrderService(bus, store);
const action = {
    type: ACTIONS.ORDER.CHANGE_QUANTITY,
    target: 1,
    item: { id: 2, quantity: 1 },
};


test('Functional: Change Quantity', () => {
    const result = OrderService.handle(action);
    expect(result.result, 'to satisfy', {
        id: 1,
        status: STATUS.ORDER.OPEN,
    });
});
