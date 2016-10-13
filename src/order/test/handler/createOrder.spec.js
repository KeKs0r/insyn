const test = require('ava');
const expect = require('unexpected');
const { CREATE_ORDER } = require('../../../constants');

test('service:order:core:createOrder', () => {
    const action = {
        type: CREATE_ORDER,
        customer: 15,
        items: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 1 },
        ],
    };
});
