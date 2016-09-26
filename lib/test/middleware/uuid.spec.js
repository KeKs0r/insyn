const test = require("ava");
const expect = require("unexpected");

const createService = require("../../src/createService");
const applyMiddleware = require("../../src/applyMiddleware");
const mockLU = require("../fixtures/mockLogicUnit");

const uuidMiddleware = require('../../src/middleware/uuid');

test('insyn:middleware:uuid - adds uuid to action', t => {
    const service = createService(mockLU,
        applyMiddleware(uuidMiddleware)
    );
    const action = {
        testaction: 5
    };
    const result = service(action);
    expect(result, 'to satisfy', {
        action: {
            testaction: 5
        },
        uuid: expect.it('to be positive')
    });
});