const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');


const createService = require('../../src/createService');
const applyMiddleware = require('../../src/enhancer/applyMiddleware');

const makeTargetMiddleware = require('../../src/middleware/target');


//  Fixtures
const action = {
    type: 'mock.action',
    target: 3,
};
const targetData = {
    id: 3,
    name: 'Jack Sparrow',
};
const fetcher = () => targetData;
const handler = () => ({ id: 3, name: 'Jack_Sparrow' });

test('insyn:middleware:target - makeTargetMiddleware combines fetcher and diff middleware', () => {
    const targetMiddleware = makeTargetMiddleware(fetcher);
    const service = {};
    const withService = targetMiddleware(service);
    const next = payload => ({ result: payload });
    const withNext = withService(next);
    const result = withNext({ action });
    expect(result, 'to have key', 'target');
});

test('insyn:middleware:target - target is fetched and provided to handler', () => {
    const handlerSpy = Sinon.spy(handler);
    const fetcherSpy = Sinon.spy(fetcher);

    const service = createService(
        applyMiddleware(makeTargetMiddleware(fetcherSpy))
    );
    service.register(action.type, handlerSpy);
    const response = service.handle(action);

    expect(fetcherSpy, 'was called with', 3);
    expect(handlerSpy, 'was called with', expect.it('to satisfy', {
        target: targetData,
    }));
    expect(response.action, 'to be', action);
});

test('insyn:middleware:target - target is result as well', () => {
    const service = createService(
        applyMiddleware(makeTargetMiddleware(fetcher))
    );
    service.register(action.type, handler);
    const response = service.handle(action);
    expect(response, 'to have key', 'target');
    expect(response.target, 'to be', targetData);
});
