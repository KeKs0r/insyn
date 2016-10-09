const test = require('ava');
const expect = require('unexpected');

const compose = require('../../src/util/compose');

test('insyn:util:compose', () => {
    const first = i => (i + 1);
    const second = i => (i * 2);

    const final = compose(second, first);
    const result = final(1);
    expect(result, 'to equal', 4);
});