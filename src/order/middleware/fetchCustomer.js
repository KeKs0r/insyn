// eslint-disable-next-line no-unused-vars
const makeFetchCustomer = store => service => next => payload => {
    const { action, target } = payload;
    const { customer } = action;
    const customerId = customer || target.customer;
    if (customerId) {
        const customerData = store.get(customerId);
        const decoratedAction = Object.assign({}, action, { customerData });
        const nextPayload = Object.assign({}, payload, { action: decoratedAction });
        const result = next(nextPayload);
        return Object.assign({}, result, { customerData });
    }
    return next(payload);
};

module.exports = makeFetchCustomer;