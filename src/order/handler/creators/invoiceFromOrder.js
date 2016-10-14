const { CREATE_INVOICE } = require('../../../constants');
const createInvoiceFromOrder = order => {
    const action = {
        type: CREATE_INVOICE,
        customer: order.customer,
        items: order.items,
        prices: order.prices,
    };
    return action;
};

module.exports = createInvoiceFromOrder;