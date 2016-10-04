const test = require("ava");
const expect = require("unexpected");
const createService = require("../src/createService");

const applyMiddleware = require('../src/enhancer/applyMiddleware');
const addSideDispatch = require('../src/enhancer/addSideDispatch');
const compose = require('../src/util/compose');


const {EventEmitter} = require('events');
const mockLU = require("./fixtures/mockLogicUnit");


test('insyn:createService - single LU - no middleware', t => {
    const {consume} = createService(mockLU);
    const action = {
        testaction: 5
    };
    const result = consume(action);
    expect(result, 'to satisfy', {
        testaction: 5,
        mockLU: true
    });
});

test('insyn:createService - single LU - composed middlewares', t => {
    const service = createService(mockLU,
        compose(
            applyMiddleware(),
            addSideDispatch(new EventEmitter())
        )
    );

    expect(service.dispatch, 'to be ok', 'Dispatch not defined on service');


    const action = {
        testaction: 5
    };
    const {result} = service.consume(action);
    expect(result, 'to satisfy', {
        action: expect.it('to be', action),
        mockLU: true
    });

});