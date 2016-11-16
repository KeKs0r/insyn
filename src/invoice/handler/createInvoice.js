const { STATUS } = require('../../constants');
const uuid = require('uuid');

const createInvoiceHandler = ({ action }) => {
    const invoice = {
        id: uuid.v1(),
        order: action.order,
        prices: action.prices,
        customer: action.customer,
        items: action.items,
        status: STATUS.INVOICE.OPEN,
    };
    return invoice;
};

module.exports = createInvoiceHandler;