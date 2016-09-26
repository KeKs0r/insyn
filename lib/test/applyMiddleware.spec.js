const test = require("ava");
const expect = require("unexpected");
const sinon = require('sinon');

const createService = require("../src/createService");
const applyMiddleware = require("../src/applyMiddleware");
const makeMockMiddleware = require("./fixtures/makeMockMiddleware");
const mockLU = require("./fixtures/mockLogicUnit");


test('insyn:applyMiddleware - applies transformMiddleware by default', t => {
    const service = createService(mockLU,
        applyMiddleware()
    );
    const action = {
        testaction: 5
    };
    const result = service(action);
    expect(result, 'to satisfy', {
        action: expect.it('to be', action)
    });
});

test('insyn:applyMiddleware - single Middleware modifies result', t => {
    const mockMiddleware = makeMockMiddleware(() => {});
    const service = createService(mockLU,
        applyMiddleware(mockMiddleware)
    );
    const action = {
        testaction: 5
    };
    const result = service(action);
    expect(result, 'to satisfy', {
        mockLU: true,
        mockMiddleware: true,
        action: expect.it('to be', action)
    });
});


test('insyn:applyMiddleware - single middleware can call functions', t => {
    const spy = sinon.spy();
    const mockMiddleware = makeMockMiddleware(spy);
    const service = createService(mockLU,
        applyMiddleware(mockMiddleware)
    );
    const action = {
        testaction: 5
    };
    expect(spy.called, 'to be false');
    const result = service(action);
    expect(spy.called, 'to be true');
});


test('insyn:applyMiddleware - multiple middlewares are called', t => {
    const spy = sinon.spy();
    const firstMiddleware = makeMockMiddleware(spy);
    const secondMiddleware = makeMockMiddleware(spy);
    const service = createService(mockLU,
        applyMiddleware(firstMiddleware, secondMiddleware)
    );
    const action = {
        testaction: 5
    };
    expect(spy.called, 'to be false');
    const result = service(action);
    expect(spy.called, 'to be true');
})