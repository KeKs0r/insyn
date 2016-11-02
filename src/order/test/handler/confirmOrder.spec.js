const test = require('ava');
const expect = require('unexpected');

const { ACTIONS, STATUS } = require('../../../constants');
const makeOrderService = require('../../index');
const { noop } = require('lodash');
const { memoryStore } = require('../../../../lib/src');

const orderFixtures = {
    1: {
        id: 1,
        status: STATUS.ORDER.OPEN,
    },
};
const store = memoryStore(Object.assign({}, orderFixtures));


const bus = {
    emit: noop,
};
const OrderService = makeOrderService(bus, store);
const action = {
    type: ACTIONS.ORDER.CONFIRM_ORDER,
    target: 1,
};


test('Functional: Confirm Order', () => {
    const result = OrderService.handle(action);
    expect(result.result, 'to satisfy', {
        id: 1,
        status: STATUS.ORDER.CONFIRMED,
    });
});
