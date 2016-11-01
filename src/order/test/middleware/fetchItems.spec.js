const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');
const _ = require('lodash');

const { createService, enhancer } = require('../../../../lib/src'); // eslint-disable-line import/newline-after-import
const { applyMiddleware } = enhancer;
const wrapMockMiddleware = require('../../../../test/util/wrapMockMiddleware');

const makeFetchItems = require('../../middleware/fetchItems');

//  Fixtures
const productData = require('../fixtures/products.json');

const action = {
    type: 'mock.action',
    items: [
        { id: 2, quantity: 2 },
        { id: 3, quantity: 1 },
    ],
};
const fetcher = id => productData[id];
const handler = () => ({});

test('fetchItems - unit middleware', () => {
    const fetchItemsMiddleware = makeFetchItems(fetcher);
    const withNext = wrapMockMiddleware(fetchItemsMiddleware);
    const result = withNext({ action });
    expect(result.payload.action, 'to have key', 'itemsData');
});


test('fetchItems - within service', () => {
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
        args: [{ action: expect.it('to satisfy', { itemsData }) }],
    });
});
