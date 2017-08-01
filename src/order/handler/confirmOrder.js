// const Joi = require('joi');
const { STATUS } = require('../../constants');


const confirmOrderHandler = ({ target }) => {
  const updatedOrder = Object.assign({}, target, { status: STATUS.ORDER.CONFIRMED });
  return updatedOrder;
};

module.exports = confirmOrderHandler;