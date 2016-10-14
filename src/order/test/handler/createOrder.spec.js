const test = require('ava');
const expect = require('unexpected');
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');

const { CREATE_ORDER, CREATE_INVOICE } = require('../../../constants');
const createOrder = require('../../handler/createOrder');

const action = {
    type: CREATE_ORDER,
    customer: 15,
    items: [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 },
    ]
};

const decoratedAction = Object.assign({}, action, {
    itemsData: {
        1: { id: 1, price: 1 },
        3: { id: 3, price: 2 },
    },
});

test('Unit: Calculates Prices', () => {
    const result = createOrder({
        action: decoratedAction,
        push: () => ({}),
    });
    expect(result, 'to have keys', ['prices']);
});

test('Unit: Push Create Invoice', () => {
    const push = Sinon.spy();
    createOrder({
        action: decoratedAction,
        push,
    });
    expect(push, 'to have a call satisfying', [
        expect.it('to satisfy', {
            type: CREATE_INVOICE,
        }),
    ]);

});
