const _ = require('lodash');

const round = price => Math.round(price * 100) / 100;

const discounts = {
    "A": 0.10,
    "B": 0.03,
    "C": 0,
}


const calculatePrices = action => {
    const { itemsData, items, customerData } = action;
    discounts['A'] = global.globalDiscount || discounts['A'];
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

        if (customerData && _.isNumber(discounts[customerData.classification])) {
            const currentDiscount = discounts[customerData.classification];
            const discountAmount = base.total * currentDiscount;
            const discount = {
                type: 'Discount',
                unit: discounts[customerData.classification],
                total: round(discountAmount),
                aggregate: round(base.total - discountAmount),
            };
            itemPrice.push(discount);
        }

        const vat = {
            type: 'VAT',
            unit: '19%',
            total: round(0.19 * _.last(itemPrice).total),
            aggregate: round(_.last(itemPrice).aggregate * 1.19),
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