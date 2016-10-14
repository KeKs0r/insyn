// const Joi = require('joi');
const prices = require('./subhandler/prices');



const createOrderHandler = ({action, push}) => {
    const order = {
        prices: prices(action),
        customer: action.customer,
        items: action.items,
    };
    return order;
};

module.exports = createOrderHandler;