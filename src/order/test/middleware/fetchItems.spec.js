const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');

const { createService, enhancer } = require('../../../../lib/src');
const { applyMiddleware } = enhancer;

const makeFetchItems = require('../../middleware/fetchItems');


//  Fixtures
const action = {
    type: 'mock.action',
    items: [3, 4],
};
const productData = {
    3: {
        id: 3,
        name: 'Super Product',
    },
    4: {
        id: 4,
        name: 'Different Product',
    },
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

    expect(fetcherSpy, 'to have a call satisfying', [3]);
    expect(fetcherSpy, 'to have a call satisfying', [4]);
    expect(handlerSpy, 'to have a call satisfying', {
        args: [{ itemsData: productData }],
    });
});