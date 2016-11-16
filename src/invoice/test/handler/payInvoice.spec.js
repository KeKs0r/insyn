const test = require('ava');
const expect = require('unexpected');

const { ACTIONS, STATUS } = require('../../../constants');
const createInvoiceService = require('../../index');
const { MemoryStore } = require('../../../../lib/src');
const { noop } = require('lodash');

const invoiceData = require('../fixtures/invoices');

const action = {
    type: ACTIONS.INVOICE.PAY_INVOICE,
    target: 1,
    amount: invoiceData[1].prices.total,
};

const store = new MemoryStore(Object.assign({}, invoiceData));

const bus = {
    emit: noop,
};
const InvoiceService = createInvoiceService(bus, store);

test('Functional: Pay Invoice Completely', () => {
    const result = InvoiceService.handle(action);
    expect(result, 'to satisfy', {
        action: expect.it('to be', action),
        target: expect.it('to be', invoiceData[1]),
        result: expect.it('to satisfy', {
            status: STATUS.INVOICE.FULLY_PAID,
            prices: expect.it('to satisfy', {
                open: 0,
            }),
        }),
    });
});
