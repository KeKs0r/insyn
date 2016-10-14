// eslint-disable-next-line no-unused-vars
const makeFetchCustomer = fetcher => service => next => payload => {
    const { action } = payload;
    const { customer } = action;
    if (customer) {
        const customerData = fetcher(customer);
        const nextPayload = Object.assign({}, action, { customerData });
        return next(nextPayload);
    }
    return next(action);
};

module.exports = makeFetchCustomer;