const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');

const { createService, enhancer } = require('../../../../lib/src'); // eslint-disable-line import/newline-after-import
const { applyMiddleware } = enhancer;
const wrapMockMiddleware = require('../../../../test/util/wrapMockMiddleware');

const makeFetchCustomer = require('../../middleware/fetchCustomer');


//  Fixtures
const action = {
    type: 'mock.action',
    customer: 3,
};
const customerData = require('../fixtures/customer.json'); // eslint-disable-line import/newline-after-import
const fetcher = () => customerData;
const handler = () => ({});

test('fetchCustomer - unit middleware', () => {
    const fetchCustomerMiddleware = makeFetchCustomer(fetcher);
    const withNext = wrapMockMiddleware(fetchCustomerMiddleware);
    const result = withNext({ action });
    expect(result.payload, 'to have key', 'customerData');
});


test('fetchCustomer - within service', () => {
    const handlerSpy = Sinon.spy(handler);
    const fetcherSpy = Sinon.spy(fetcher);

    const service = createService(
        applyMiddleware(makeFetchCustomer(fetcherSpy))
    );
    service.register(action.type, handlerSpy);
    service.handle(action);

    expect(fetcherSpy, 'was called with', 3);
    expect(handlerSpy, 'was called with', expect.it('to satisfy', {
        customerData,
    }));
});
