const applyMiddleware = require("./src/applyMiddleware");
const sinon = require('sinon');
const makeMockMiddleware = require("./test/fixtures/makeMockMiddleware");
const mockLU = require("./test/fixtures/mockLogicUnit");
const createService = require("./src/createService");

const spy = sinon.spy();
const uuidMiddleware = require('./src/middleware/uuid');


const service = createService(mockLU,
    applyMiddleware(uuidMiddleware)
);
const action = {
    testaction: 5
};
const result = service(action);

console.log(result);
