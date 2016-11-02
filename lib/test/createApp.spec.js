const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');

const createApp = require('../src/createApp');
const em = { on: Sinon.spy() };

test('calls handle on all services', () => {
    const first = {
        handle: Sinon.spy(),
    };
    const second = {
        handle: Sinon.spy(),
    };

    const action = {
        type: 'MOCK.ACTION',
    };

    const app = createApp(em, first, second);
    app.handle(action);
    expect(first.handle, 'was called with', action);
    expect(second.handle, 'was called with', action);
});
