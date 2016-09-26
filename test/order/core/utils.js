const OrderCore = require('../../../src/order/core');

const makeOrderBG = () => {
    return new OrderCore();
}

module.exports = makeOrderBG;