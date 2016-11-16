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
    [ACTIONS.ORDER.CONFIRM_ORDER]: target => ({
        type: ACTIONS.ORDER.CONFIRM_ORDER,
        target,
    }),
};

module.exports = process;