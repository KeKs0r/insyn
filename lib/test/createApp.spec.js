const test = require('ava');
const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));
const Sinon = require('sinon');
const createApp = require('../src/createApp');
const { noop } = require('lodash');

const em = { on: Sinon.spy(), onAny: noop };

test('calls handle on all services', () => {
    const first = {
        handle: Sinon.spy(),
        canHandle: () => true,
    };
    const second = {
        handle: Sinon.spy(),
        canHandle: () => true,
    };

    const action = {
        type: 'MOCK.ACTION',
    };

    const app = createApp(em, first, second);
    app.handle(action);
    expect(first.handle, 'was called with', action);
    expect(second.handle, 'was called with', action);
});
