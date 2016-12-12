const Joi = require('joi');
const { STATUS } = require('../../constants');
const _ = require('lodash');


const actionSchema = Joi.object().keys({
    target: Joi.required(),
    amount: Joi.number().min(0.01).required(),
}).unknown();

const round = price => Math.round(price * 100) / 100;

const payInvoiceHandler = ({ action, target }) => {
    Joi.attempt(action, actionSchema);
    const toPay = _.get(target, 'prices.open');
    const open = toPay || _.get(target, 'prices.total');
    const newOpen = round(open - action.amount);
    let newStatus;
    if (newOpen > 0) {
        newStatus = STATUS.INVOICE.PARTIALLY_PAID;
    } else if (newOpen === 0) {
        newStatus = STATUS.INVOICE.FULLY_PAID;
    } else if (newOpen < 0) {
        newStatus = STATUS.INVOICE.OVER_PAID;
    }
    const newPrices = Object.assign({}, target.prices, { open: newOpen });
    const result = Object.assign({}, target, {
        prices: newPrices,
        status: newStatus,
    });
    return result;
};

module.exports = payInvoiceHandler;