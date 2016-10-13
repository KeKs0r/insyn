/**
 * Composes functions from left to right
 * @param  {...Function} funcs - Functions to compose
 * @return {Function}
 */

/* eslint-disable arrow-body-style */
const compose = (...funcs) => {
    return funcs.reduceRight((composed, f) => {
        return (...args) => {
            return f(composed(...args));
        };
    });
};
/* eslint-enable */

module.exports = compose;