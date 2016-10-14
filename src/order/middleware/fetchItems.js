const { keyBy, mapValues } = require('lodash');

// eslint-disable-next-line no-unused-vars
const makeFetchItems = fetcher => service => next => payload => {
    const { action } = payload;
    const { items } = action;
    if (items) {
        const keyed = keyBy(items, 'id');
        const itemsData = mapValues(keyed, item => fetcher(item.id));
        const nextPayload = Object.assign({}, action, { itemsData });
        return next(nextPayload);
    }
    return next(action);
};

module.exports = makeFetchItems;