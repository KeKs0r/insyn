const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');


const createService = require('../../src/createService');
const applyMiddleware = require('../../src/enhancer/applyMiddleware');

const makeTargetMiddleware = require('../../src/middleware/target');
const Store = require('../../src/util/memoryStore');


//  Fixtures
const action = {
    type: 'mock.action',
    target: 3,
};
const targetData = {
    id: 3,
    name: 'Jack Sparrow',
};
const targetResultData = { id: 3, name: 'Jack_Sparrow' };

const handler = () => (targetResultData);

test('insyn:middleware:target - makeTargetMiddleware combines fetcher and diff middleware', () => {
    const store = new Store({ 3: targetData });
    const targetMiddleware = makeTargetMiddleware(store);
    const service = {};
    const withService = targetMiddleware(service);
    const next = payload => ({ result: payload });
    const withNext = withService(next);
    const result = withNext({ action });
    expect(result, 'to have key', 'target');
});

test('insyn:middleware:target - target is fetched and provided to handler as well as result', () => {
    const store = new Store({ 3: targetData });
    const handlerSpy = Sinon.spy(handler);
    const service = createService(
        applyMiddleware(makeTargetMiddleware(store))
    );
    service.register(action.type, handlerSpy);

    const response = service.handle(action);
    expect(handlerSpy, 'was called with', expect.it('to satisfy', {
        target: targetData,
    }));
    expect(response.action, 'to be', action);
    expect(response, 'to have key', 'target');
    expect(response.target, 'to be', targetData);
});

test('insyn:middleware:target - modified target is returned', () => {
    const store = new Store({ 3: targetData });
    const service = createService(
        applyMiddleware(makeTargetMiddleware(store))
    );
    service.register(action.type, handler);
    const response = service.handle(action);
    expect(response.result, 'to be', targetResultData);
});

test('insyn:middleware:target - modified target is stored in store', () => {
    const store = new Store({ 3: targetData });
    const service = createService(
        applyMiddleware(makeTargetMiddleware(store))
    );
    service.register(action.type, handler);

    service.handle(action);

    expect(store.get(3), 'to be', targetResultData);
});
