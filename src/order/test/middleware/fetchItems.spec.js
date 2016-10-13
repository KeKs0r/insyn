const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');
const _ = require('lodash');

const { createService, enhancer } = require('../../../../lib/src');
const { applyMiddleware } = enhancer;

const makeFetchItems = require('../../middleware/fetchItems');

//  Fixtures
const productData = require('../fixtures/products.json');

const action = {
    type: 'mock.action',
    items: [2, 3],
};
const fetcher = id => productData[id];
const handler = () => ({});

test('fetchItems - unit middleware', () => {
    const fetchItemsMiddleware = makeFetchItems(fetcher);
    const service = {};
    const withService = fetchItemsMiddleware(service);
    const next = payload => ({ payload });
    const withNext = withService(next);
    const result = withNext({ action });
    expect(result.payload, 'to have key', 'itemsData');
});


test('fetchCustomer - within service', () => {
    const handlerSpy = Sinon.spy(handler);
    const fetcherSpy = Sinon.spy(fetcher);

    const service = createService(
        applyMiddleware(makeFetchItems(fetcherSpy))
    );
    service.register(action.type, handlerSpy);
    service.handle(action);

    const itemsData = _.pick(productData, [2, 3]);

    expect(fetcherSpy, 'to have a call satisfying', [2]);
    expect(fetcherSpy, 'to have a call satisfying', [3]);
    expect(handlerSpy, 'to have a call satisfying', {
        args: [{ itemsData }],
    });
});
