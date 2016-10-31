// const Joi = require('joi');

const createInvoiceHandler = ({ action/*, push */ }) => {
    const invoice = {
        prices: action.prices,
        customer: action.customer,
        items: action.items,
    };
    // push(createInvoice(order));
    return invoice;
};

module.exports = createInvoiceHandler;