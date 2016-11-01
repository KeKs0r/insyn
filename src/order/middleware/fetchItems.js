const { keyBy, mapValues } = require('lodash');

// eslint-disable-next-line no-unused-vars
const makeFetchItems = fetcher => service => next => payload => {
    const { action } = payload;
    const { items } = action;
    if (items) {
        const keyed = keyBy(items, 'id');
        const itemsData = mapValues(keyed, item => fetcher(item.id));
        const decoratedAction = Object.assign({}, action, { itemsData });
        const nextPayload = Object.assign({}, payload, { action: decoratedAction });
        return next(nextPayload);
    }
    return next(action);
};

module.exports = makeFetchItems;