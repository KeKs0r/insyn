const { ACTIONS } = require('../../../constants');

const createInvoiceFromOrder = order => {
    const action = {
        type: ACTIONS.INVOICE.CREATE_INVOICE,
        customer: order.customer,
        items: order.items,
        prices: order.prices,
    };
    return action;
};

module.exports = createInvoiceFromOrder;