// eslint-disable-next-line no-unused-vars
const makeFetchCustomer = store => service => next => payload => {
    const { action } = payload;
    const { customer } = action;
    if (customer) {
        const customerData = store.get(customer);
        const decoratedAction = Object.assign({}, action, { customerData });
        const nextPayload = Object.assign({}, payload, { action: decoratedAction });
        const result = next(nextPayload);
        return Object.assign({}, result, { customerData });
    }
    return next(payload);
};

module.exports = makeFetchCustomer;