const test = require("ava");
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');


const createService = require("../../src/createService");
const applyMiddleware = require("../../src/enhancer/applyMiddleware");

const makeTargetMiddleware = require('../../src/middleware/target');


//  Fixtures
const action = {
    target: 3
};
const targetData = {
    id: 3,
    name: 'Jack Sparrow'
};
const _fetcher = () => {
    return targetData
};
const _handler = () => {
    return {id: 3, name: 'Jack_Sparrow'};
};

test('insyn:middleware:target - makeTargetMiddleware combines fetcher and diff middleware', t => {
    const targetMiddleware = makeTargetMiddleware(_fetcher);
    const service = {};
    const withService = targetMiddleware(service);
    const next = (payload) => {
        return {result: payload}
    };
    const withNext = withService(next);
    const result = withNext({action});
    expect(result, 'to have key', 'target');
});

test('insyn:middleware:target - target is fetched and provided to handler', t => {
    const handler = Sinon.spy(_handler);
    const fetcher = Sinon.spy(_fetcher);

    const service = createService(handler,
        applyMiddleware(makeTargetMiddleware(fetcher))
    );
    const response = service.consume(action);

    expect(fetcher, 'was called with', 3);
    expect(handler, 'was called with', expect.it('to satisfy', {
        target: targetData
    }));
    expect(response.action, 'to be', action);
});

test('insyn:middleware:target - target is result as well', t => {
    const service = createService(_handler,
        applyMiddleware(makeTargetMiddleware(_fetcher))
    );
    const response = service.consume(action);

    expect(response, 'to have key', 'target');
    expect(response.target, 'to be', targetData);
});