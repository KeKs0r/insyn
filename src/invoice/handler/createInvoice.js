const { STATUS } = require('../../constants');

const createInvoiceHandler = ({ action }) => {
    const invoice = {
        prices: action.prices,
        customer: action.customer,
        items: action.items,
        status: STATUS.INVOICE.OPEN,
    };
    return invoice;
};

module.exports = createInvoiceHandler;