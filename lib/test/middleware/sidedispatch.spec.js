const test = require("ava");
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');


const createService = require("../../src/createService");
const applyMiddleware = require("../../src/enhancer/applyMiddleware");
const sideDispatchEnhancer = require('../../src/enhancer/addSideDispatch');
const compose = require('../../src/util/compose');

const sidedispathMiddleware = require('../../src/middleware/sidedispatch');
const uuidMiddleware = require('../../src/middleware/uuid');


/*
 * Fixtures
 */
const handler = ({push, action}) => {
    push(action);
    return {handled: true}
};

test('insyn:middleware:sidedispatch - middleware requires enhancer', t => {
    const build = () => {
        createService(handler,
            applyMiddleware(sidedispathMiddleware)
        );
    };
    expect(build, 'to throw', (e) => {
        expect(e.name, 'to equal', 'ValidationError');
        /*
         * @todo: Validate details
         * @wait: https://github.com/unexpectedjs/unexpected/pull/338
         */
    });
});

test('insyn:middleware:sidedispatch - middleware requires uuid middleware', t => {
    const {consume} = createService(handler,
        compose(
            applyMiddleware(sidedispathMiddleware),
            sideDispatchEnhancer(() => {})
        )
    );
    const action = {
        testaction: 5
    };
    const consumeAction = () => {
        consume(action);
    }
    expect(consumeAction, 'to throw', (e) => {
        expect(e.name, 'to equal', 'ValidationError');
        /*
         * @todo: Validate details
         * @wait: https://github.com/unexpectedjs/unexpected/pull/338
         */
    });
});

test('insyn:middleware:sidedispatch - can push action to provided bus*', t => {
    const emit = Sinon.spy();
    const {consume} = createService(handler,
        compose(
            applyMiddleware(uuidMiddleware, sidedispathMiddleware),
            sideDispatchEnhancer({emit})
        )
    );
    const action = {
        type: 'action.type',
        testaction: 5
    };
    consume(action);
    expect(emit, 'was called with', action.type, expect.it('to satisfy', {
        source: expect.it('to contain', '-'),
        ...action
    }));
});

test('insyn:middleware:sidedispatch - pushed actions are returned', t => {
    const emit = Sinon.spy();
    const {consume} = createService(handler,
        compose(
            applyMiddleware(uuidMiddleware, sidedispathMiddleware),
            sideDispatchEnhancer({emit})
        )
    );
    const action = {
        type: 'action.type',
        testaction: 5
    };
    const response = consume(action);
    expect(response, 'to have key', 'sideactions');
    expect(response.sideactions, 'to have length', 1);
    //@TODO Validate Details
});

test.todo('Validate details in this testcase');


