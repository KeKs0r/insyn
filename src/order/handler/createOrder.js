// const Joi = require('joi');
const prices = require('./subhandler/prices');
const createInvoice = require('./creators/invoiceFromOrder');
const { STATUS } = require('../../constants');
const uuid = require('uuid');


const createOrderHandler = ({ action, push }) => {
  const order = {
    id: uuid.v1(),
    prices: prices(action),
    customer: action.customer,
    items: action.items,
    status: STATUS.ORDER.OPEN,
  };
  push(createInvoice(order));
  return order;
};

module.exports = createOrderHandler;