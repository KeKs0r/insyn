// const Joi = require('joi');
const prices = require('./subhandler/prices');
const createInvoice = require('./creators/invoiceFromOrder');


const createOrderHandler = ({ action, push }) => {
    const order = {
        prices: prices(action),
        customer: action.customer,
        items: action.items,
    };
    push(createInvoice(order));
    return order;
};

module.exports = createOrderHandler;