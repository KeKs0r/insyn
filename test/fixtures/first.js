const { ACTIONS } = require('../../src/constants');

const process = {
    [ACTIONS.ORDER.CREATE_ORDER]: {
        type: ACTIONS.ORDER.CREATE_ORDER,
        customer: 15,
        items: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 1 },
        ],
    },
};

module.exports = process;