var test = require("ava");
var expect = require("unexpected");
var createService = require("../src/createService");
var mockLU = require("./fixtures/mockLogicUnit");


test('insyn:createService - single LU - no middleware', t => {
    const dispatch = createService(mockLU);
    const action = {
        testaction: 5
    };
    const result = dispatch(action);
    expect(result, 'to satisfy', {
        testaction: 5,
        mockLU: true
    });
});