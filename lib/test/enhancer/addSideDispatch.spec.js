const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const sinon = require('sinon');

const createService = require('../../src/createService');
const addSideDispatch = require('../../src/enhancer/addSideDispatch');


const { EventEmitter } = require('events');


test('insyn:enhancer:addSideDispatch - adds dispatch function to service', () => {
    const em = new EventEmitter();
    const service = createService(
        addSideDispatch(em)
    );
    expect(service, 'to satisfy', {
        dispatch: expect.it('to be ok'),
    });
});

test('insyn:enhancer:addSideDispatch - dispatch emits event', () => {
    const em = new EventEmitter();
    const service = createService(
        addSideDispatch(em)
    );
    const action = {
        type: 'mock.action',
        testaction: 5,
    };
    const spy = sinon.spy();
    em.on(action.type, spy);

    const otherTypeSpy = sinon.spy().named('otherAction');

    service.dispatch(action);

    expect(spy, 'to have a call satisfying', [action]);
    expect(otherTypeSpy, 'was not called');
});