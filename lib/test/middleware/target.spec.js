const test = require("ava");
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');


const createService = require("../../src/createService");
const applyMiddleware = require("../../src/enhancer/applyMiddleware");

const makeTargetMiddleware = require('../../src/middleware/target');


test('insyn:middleware:target - target is fetched and provided to handler', t => {
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
    const handler = Sinon.spy(() => action);
    const fetcher = Sinon.spy(_fetcher);

    const service = createService(handler,
        applyMiddleware(makeTargetMiddleware(fetcher))
    );
    const response = service.consume(action);

    expect(fetcher, 'was called with', 3);
    expect(handler, 'was called with', expect.it('to satisfy', {
        target: targetData
    }))
    expect(response.action, 'to be', action);
});