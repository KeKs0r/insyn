const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');

const { createService, enhancer } = require('../../../../lib/src'); // eslint-disable-line import/newline-after-import
const { applyMiddleware } = enhancer;

const makeFetchCustomer = require('../../middleware/fetchCustomer');


//  Fixtures
const action = {
    type: 'mock.action',
    customer: 3,
};
const customerData = require('../fixtures/customer.json'); // eslint-disable-line import/newline-after-import
const store = { get: () => customerData };
const handler = () => ({});

test('fetchCustomer - unit middleware', () => {
    const fetchCustomerMiddleware = makeFetchCustomer(store);
    const service = {};
    const withService = fetchCustomerMiddleware(service);
    const next = payload => ({ payload });
    const withNext = withService(next);
    const result = withNext({ action });
    expect(result.payload.action, 'to have key', 'customerData');
});


test('fetchCustomer - within service', () => {
    const handlerSpy = Sinon.spy(handler);

    const service = createService(
        applyMiddleware(makeFetchCustomer(store))
    );
    service.register(action.type, handlerSpy);
    service.handle(action);

    expect(handlerSpy, 'was called with', expect.it('to satisfy', {
        action: expect.it('to satisfy', {
            customerData,
        }),
    }));
});
