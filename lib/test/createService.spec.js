const test = require("ava");
const expect = require("unexpected");
const createService = require("../src/createService");
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