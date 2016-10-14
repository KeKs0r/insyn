const _ = require('lodash');

const round = price => Math.round(price * 100) / 100;

const calculatePrices = action => {
    const { itemsData, items } = action;
    const itemPrices = _.mapValues(items, item => {
        const itemData = itemsData[item.id];
        const itemPrice = [];

        const base = {
            type: 'Base',
            unit: itemData.price,
            total: round(itemData.price * item.quantity),
            aggregate: round(itemData.price * item.quantity),
        };
        itemPrice.push(base);
        const vat = {
            type: 'VAT',
            unit: '19%',
            total: round(0.19 * base.total),
            aggregate: round(base.total * 1.19),
        };
        itemPrice.push(vat);
        return itemPrice;
    });
    const itemTotals = _.map(itemPrices, i => _.last(i).aggregate);
    const total = round(_.sum(itemTotals));
    return {
        itemPrices,
        total,
    };
};
calculatePrices.round = round;
module.exports = calculatePrices;