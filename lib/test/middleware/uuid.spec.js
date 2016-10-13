const test = require('ava');
const expect = require('unexpected');

const createService = require('../../src/createService');
const applyMiddleware = require('../../src/enhancer/applyMiddleware');
const mockLU = require('../fixtures/mockLogicUnit');

const uuidMiddleware = require('../../src/middleware/uuid');

test('insyn:middleware:uuid - adds uuid to action', () => {
    const { consume } = createService(mockLU,
        applyMiddleware(uuidMiddleware)
    );
    const action = {
        testaction: 5,
    };
    const { result } = consume(action);
    expect(result, 'to satisfy', {
        action: {
            testaction: 5,
        },
        uuid: expect.it('to contain', '-'),
    });
});