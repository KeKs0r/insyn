const test = require('ava');
const expect = require('unexpected');

const createService = require('../../src/createService');
const applyMiddleware = require('../../src/enhancer/applyMiddleware');
const mockLU = require('../fixtures/mockHandler');

const uuidMiddleware = require('../../src/middleware/uuid');

test('insyn:middleware:uuid - adds uuid to action', () => {
    const { register, handle } = createService(
        applyMiddleware(uuidMiddleware)
    );
    const action = {
        type: 'mock.action',
        testaction: 5,
    };
    register(action.type, mockLU);
    const { result } = handle(action);
    expect(result, 'to satisfy', {
        action: {
            testaction: 5,
        },
        uuid: expect.it('to contain', '-'),
    });
});