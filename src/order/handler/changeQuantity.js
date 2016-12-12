// const Joi = require('joi');
const { STATUS } = require('../../constants');
const _ = require('lodash');
const prices = require('./subhandler/prices');


const changeQuantityHandler = ({ target, action }) => {

    const items = _.map(target.items, (it) => {
        if(it.id === _.get(action, 'item.id')) {
            return Object.assign({}, it, action.item);
        }
        return it;
    });
    const updatedOrder = Object.assign({}, target, {items: items});
    const withPrices = Object.assign({}, updatedOrder, {
        prices: prices({
            items,
            itemsData: action.itemsData,
            customerData: action.customerData,
        })
    });
    return withPrices;
};

module.exports = changeQuantityHandler;