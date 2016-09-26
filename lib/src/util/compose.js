/**
 * Composes functions from left to right
 * @param  {...Function} funcs - Functions to compose
 * @return {Function}
 */
"use strict";

const compose = function (...funcs) {
    return funcs.reduceRight(function (composed, f) {
        return function() {
            return f(composed.apply(null, arguments));
        }
    });
};
module.exports = compose;