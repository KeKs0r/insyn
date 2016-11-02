module.exports = {
    1: {
        id: 1,
        prices: {
            itemPrices: {
                0: [
                    { type: 'Base', aggregate: 20, unit: 10, total: 20 },
                    { type: 'VAT', aggregate: 23.8, unit: '19%', total: 3.8 },
                ],
                1: [
                    { type: 'Base', aggregate: 0.99, unit: 0.99, total: 0.99 },
                    { type: 'VAT', aggregate: 1.18, unit: '19%', total: 0.19 },
                ],
            },
            total: 24.98,
        },
        customer: 15,
        items: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 1 },
        ],
    },
};