const { keyBy, mapValues } = require('lodash');

// eslint-disable-next-line no-unused-vars
const makeFetchItems = fetcher => service => next => payload => {
    const { action } = payload;
    const { items } = action;
    if (items) {
        const itemsData = mapValues(keyBy(items), id => fetcher(id));
        const nextPayload = Object.assign({}, action, { itemsData });
        return next(nextPayload);
    }
    return next(action);
};

module.exports = makeFetchItems;