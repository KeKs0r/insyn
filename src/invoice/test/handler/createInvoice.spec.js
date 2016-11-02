const test = require('ava');
const expect = require('unexpected');

const { ACTIONS, STATUS } = require('../../../constants');
const createInvoiceService = require('../../index');
const { noop } = require('lodash');

const action = {
    type: ACTIONS.INVOICE.CREATE_INVOICE,
    prices: {
        itemPrices: {
            0: [
                { type: 'Base', aggregate: 20, unit: 10, total: 20 },
                { type: 'VAT', aggregate: 23.8, unit: '19%', total: 3.8 },
            ],
            1: [
                { type: 'Base', aggregate: 0.99, unit: 0.99, total: 0.99 },
                { type: 'VAT', aggregate: 1.18, unit: '19%', total: 0.19 },
            ],
        },
        total: 24.98,
    },
    customer: 15,
    items: [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 },
    ],
};

const bus = {
    emit: noop,
};
const InvoiceService = createInvoiceService(bus);

test('Functional: Create Invoice', () => {
    const result = InvoiceService.handle(action);

    expect(result.result, 'to satisfy', {
        prices: expect.it('to be', action.prices),
        items: expect.it('to have length', 2),
        status: STATUS.INVOICE.OPEN,
    });
});
