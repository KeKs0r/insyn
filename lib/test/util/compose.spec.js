var test = require("ava");
var expect = require("unexpected");

const compose = require('../../src/util/compose');

test('insyn:util:compose', t => {
    const first = (i) => {
        return i + 1;
    }
    const second = (i) => {
        return i * 2;
    }


    const final = compose(second, first);
    const result =  final(1);
    expect(result, 'to equal', 4);
});