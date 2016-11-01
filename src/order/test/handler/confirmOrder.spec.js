const test = require('ava');
const expect = require('unexpected');

const { ACTIONS, STATUS } = require('../../../constants');
const makeOrderService = require('../../index');
const { noop } = require('lodash');


const bus = {
    emit: noop,
};
const OrderService = makeOrderService(bus);
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
