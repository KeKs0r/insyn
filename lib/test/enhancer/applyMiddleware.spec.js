const test = require('ava');
const expect = require('unexpected');
const sinon = require('sinon');

const createService = require('../../src/createService');
const applyMiddleware = require('../../src/enhancer/applyMiddleware');

const makeMockMiddleware = require('../fixtures/makeMockMiddleware');
const mockHandler = require('../fixtures/mockHandler');

const action = {
    type: 'mock.action',
    testaction: 5,
};

test('insyn:enhancer:applyMiddleware - applies transformAction + transformResult', () => {
    const { register, handle } = createService(
        applyMiddleware()
    );

    register(action.type, mockHandler);
    const response = handle(action);
    expect(response.result, 'to satisfy', {
        action: expect.it('to be', action),
    });
    expect(response.action, 'to be', action);
});

test('insyn:enhancer:applyMiddleware - single Middleware modifies result', () => {
    const mockMiddleware = makeMockMiddleware(() => {
    });
    const { register, handle } = createService(
        applyMiddleware(mockMiddleware)
    );
    register(action.type, mockHandler);
    const { result } = handle(action);
    expect(result, 'to satisfy', {
        mockLU: true,
        mockMiddleware: true,
        action: expect.it('to be', action),
    });
});


test('insyn:enhancer:applyMiddleware - single middleware can call functions', () => {
    const spy = sinon.spy();
    const mockMiddleware = makeMockMiddleware(spy);
    const { handle, register } = createService(
        applyMiddleware(mockMiddleware)
    );
    register(action.type, mockHandler);

    expect(spy.called, 'to be false');
    handle(action);
    expect(spy.called, 'to be true');
});


test('insyn:enhancer:applyMiddleware - multiple middlewares are called', () => {
    const spy = sinon.spy();
    const firstMiddleware = makeMockMiddleware(spy);
    const secondMiddleware = makeMockMiddleware(spy);
    const { register, handle } = createService(
        applyMiddleware(firstMiddleware, secondMiddleware)
    );
    register(action.type, mockHandler);
    expect(spy.called, 'to be false');
    handle(action);
    expect(spy.called, 'to be true');
});