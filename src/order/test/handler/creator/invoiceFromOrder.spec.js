const test = require('ava');
const expect = require('unexpected');

const createInvoice = require('../../../handler/creators/invoiceFromOrder');


test('Copy Control takes over necessary fields', () => {
    const order = {
        customer: 3,
        items: [
            { id: 1, quantity: 1 },
        ],
        prices: {
            total: 10,
            itemPrices: {
                1: [
                    { type: 'Base', unit: 10, total: 10, aggregate: 10 },
                ],
            },
        },
    };
    const invoiceAction = createInvoice(order);
    expect(invoiceAction, 'to satisfy', {
        type: 'INVOICE.CREATE_INVOICE',
        items: expect.it('to equal', order.items),
        prices: expect.it('to equal', order.prices),
    });
});
