const test = require('ava');
const expect = require('unexpected');

const priceHandler = require('../../../handler/subhandler/prices');
const { round } = priceHandler;


test('prices - round does business rounding', () => {
    expect(round(5.223), 'to equal', 5.22);
    expect(round(5.225), 'to equal', 5.23);
    expect(round(5.2252), 'to equal', 5.23);
    expect(round(5.22499), 'to equal', 5.22);
});

const price1 = 10;
const price2 = 0.99;

test('prices - basic pricing has VAT', () => {
    const action = {
        items: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 1 },
        ],
        itemsData: {
            1: { id: 1, price: price1 },
            3: { id: 3, price: price2 },
        },
    };
    const { itemPrices, total } = priceHandler(action);

    const expectTotal = round(((2 * price1) + price2) * 1.19);
    expect(total, 'to equal', expectTotal);

    const firstPrices = itemPrices[0];
    const firstBase = firstPrices[0];
    expect(firstBase, 'to satisfy', {
        type: 'Base',
        unit: price1,
        total: 20,
        aggregate: 20,
    });

    const firstVAT = firstPrices[1];
    expect(firstVAT, 'to satisfy', {
        type: 'VAT',
        unit: '19%',
        total: 3.8,
        aggregate: 23.8,
    });
});
