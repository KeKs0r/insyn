const test = require('ava');
const expect = require('unexpected');
const sinon = require('sinon');

const createService = require('../../src/createService');
const applyMiddleware = require('../../src/enhancer/applyMiddleware');

const makeMockMiddleware = require('../fixtures/makeMockMiddleware');
const mockLU = require('../fixtures/mockLogicUnit');


test('insyn:enhancer:applyMiddleware - applies transformAction + transformResult', () => {
    const { consume } = createService(mockLU,
        applyMiddleware()
    );
    const action = {
        testaction: 5,
    };
    const response = consume(action);
    expect(response.result, 'to satisfy', {
        action: expect.it('to be', action),
    });
    expect(response.action, 'to be', action);
});

test('insyn:enhancer:applyMiddleware - single Middleware modifies result', () => {
    const mockMiddleware = makeMockMiddleware(() => {
    });
    const { consume } = createService(mockLU,
        applyMiddleware(mockMiddleware)
    );
    const action = {
        testaction: 5,
    };
    const { result } = consume(action);
    expect(result, 'to satisfy', {
        mockLU: true,
        mockMiddleware: true,
        action: expect.it('to be', action),
    });
});


test('insyn:enhancer:applyMiddleware - single middleware can call functions', () => {
    const spy = sinon.spy();
    const mockMiddleware = makeMockMiddleware(spy);
    const { consume } = createService(mockLU,
        applyMiddleware(mockMiddleware)
    );
    const action = {
        testaction: 5,
    };
    expect(spy.called, 'to be false');
    consume(action);
    expect(spy.called, 'to be true');
});


test('insyn:enhancer:applyMiddleware - multiple middlewares are called', () => {
    const spy = sinon.spy();
    const firstMiddleware = makeMockMiddleware(spy);
    const secondMiddleware = makeMockMiddleware(spy);
    const { consume } = createService(mockLU,
        applyMiddleware(firstMiddleware, secondMiddleware)
    );
    const action = {
        testaction: 5,
    };
    expect(spy.called, 'to be false');
    consume(action);
    expect(spy.called, 'to be true');
});