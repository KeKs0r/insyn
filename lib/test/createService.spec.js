const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');

const createService = require('../src/createService');
const applyMiddleware = require('../src/enhancer/applyMiddleware');
const addSideDispatch = require('../src/enhancer/addSideDispatch');
const compose = require('../src/util/compose');
const { EventEmitter } = require('events');

const mockHandler = require('./fixtures/mockHandler');

test('no handler - no middleware', () => {
    const service = createService();
    expect(service, 'to have keys', ['handle', 'register']);
});

test('insyn:createService - single handler - no middleware', () => {
    const { handle, register } = createService();
    const action = {
        type: 'mock.action',
        testaction: 5,
    };
    register(action.type, mockHandler);
    const result = handle(action);

    expect(result, 'to satisfy', {
        testaction: 5,
        mockLU: true,
    });
});

test('insyn:createService - single Handler - composed middlewares', () => {
    const service = createService(
        compose(
            applyMiddleware(),
            addSideDispatch(new EventEmitter())
        )
    );
    expect(service.dispatch, 'to be ok', 'Dispatch not defined on service');

    const action = {
        type: 'mock.action',
        testaction: 5,
    };
    service.register(action.type, mockHandler);

    const { result } = service.handle(action);

    expect(result, 'to satisfy', {
        action: expect.it('to be', action),
        mockLU: true,
    });
});

const testService = service => {
    const { handle, register } = service;
    const action1 = {
        type: 'mock.action',
    };
    const action2 = {
        type: 'mock.action.2',
    };
    const Spy1 = Sinon.spy();
    const Spy2 = Sinon.spy();
    register(action1.type, Spy1);
    register(action2.type, Spy2);

    expect(Spy1, 'was not called');
    expect(Spy2, 'was not called');

    handle(action1);
    expect(Spy1, 'was called');
    expect(Spy2, 'was not called');

    handle(action2);
    expect(Spy2, 'was called');
};

test('insyn:createService - multiple handler - no middleware', () => {
    const service = createService();
    testService(service);
});

test('insyn:createService - multiple handler - middleware enhancer', () => {
    const service = createService(applyMiddleware());
    testService(service);
});

test('insyn:createService - multiple handler - multiple enhancer', () => {
    const service = createService(compose(
        applyMiddleware(),
        addSideDispatch(new EventEmitter())
    ));
    testService(service);
});