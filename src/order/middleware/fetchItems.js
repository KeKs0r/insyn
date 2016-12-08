const { keyBy, mapValues } = require('lodash');

// eslint-disable-next-line no-unused-vars
const makeFetchItems = store => service => next => payload => {
    const { action } = payload;
    const { items } = action;
    if (items) {
        const keyed = keyBy(items, 'id');
        const itemsData = mapValues(keyed, item => store.get(item.id));
        const decoratedAction = Object.assign({}, action, { itemsData });
        const nextPayload = Object.assign({}, payload, { action: decoratedAction });
        const result = next(nextPayload);
        return Object.assign({}, result, { itemsData });
    }
    return next(payload);
};

module.exports = makeFetchItems;