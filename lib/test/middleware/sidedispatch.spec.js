const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');


const createService = require('../../src/createService');
const applyMiddleware = require('../../src/enhancer/applyMiddleware');
const sideDispatchEnhancer = require('../../src/enhancer/addSideDispatch');
const compose = require('../../src/util/compose');

const sidedispathMiddleware = require('../../src/middleware/sidedispatch');
const uuidMiddleware = require('../../src/middleware/uuid');


/*
 * Fixtures
 */
const handler = ({ push, action }) => {
    push(action);
    return { handled: true };
};
const action = {
    type: 'mock.action',
    testaction: 5,
};

test('insyn:middleware:sidedispatch - middleware requires enhancer', () => {
    const build = () => {
        createService(
            applyMiddleware(sidedispathMiddleware)
        );
    };
    expect(build, 'to throw', e => {
        expect(e.name, 'to equal', 'ValidationError');
        /*
         * @todo: Validate details
         * @wait: https://github.com/unexpectedjs/unexpected/pull/338
         */
    });
});

test('insyn:middleware:sidedispatch - middleware requires uuid middleware', () => {
    const { register, handle } = createService(
        compose(
            applyMiddleware(sidedispathMiddleware),
            sideDispatchEnhancer(() => {
            })
        )
    );
    register(action.type, handler);
    const consumeAction = () => {
        handle(action);
    };
    expect(consumeAction, 'to throw', e => {
        expect(e.name, 'to equal', 'ValidationError');
        /*
         * @todo: Validate details
         * @wait: https://github.com/unexpectedjs/unexpected/pull/338
         */
    });
});

test('insyn:middleware:sidedispatch - can push action to provided bus*', () => {
    const emit = Sinon.spy();
    const { handle, register } = createService(
        compose(
            applyMiddleware(uuidMiddleware, sidedispathMiddleware),
            sideDispatchEnhancer({ emit })
        )
    );
    register(action.type, handler);
    handle(action);
    expect(emit, 'was called with', action.type, expect.it('to satisfy', {
        source: expect.it('to contain', '-'),
        ...action,
    }));
});

test('insyn:middleware:sidedispatch - pushed actions are returned', () => {
    const emit = Sinon.spy();
    const { handle, register } = createService(
        compose(
            applyMiddleware(uuidMiddleware, sidedispathMiddleware),
            sideDispatchEnhancer({ emit })
        )
    );
    register(action.type, handler);
    const response = handle(action);
    expect(response, 'to have key', 'sideactions');
    expect(response.sideactions, 'to have length', 1);
    // @TODO Validate Details
});

test.todo('Validate details in this testcase: https://github.com/unexpectedjs/unexpected/pull/338');