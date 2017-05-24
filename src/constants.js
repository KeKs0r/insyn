const constants = {
    ACTIONS: {
        ORDER: {
            CREATE_ORDER: 'ORDER.CREATE_ORDER',
            CONFIRM_ORDER: 'ORDER.CONFIRM_ORDER',
            CHANGE_QUANTITY: 'ORDER.CHANGE_QUANTITY',
        },
        INVOICE: {
            CREATE_INVOICE: 'INVOICE.CREATE_INVOICE',
            PAY_INVOICE: 'INVOICE.PAY_INVOICE',
        },
    },
    STATUS: {
        ORDER: {
            OPEN: 'ORDER.OPEN',
            CONFIRMED: 'ORDER.CONFIRMED',
        },
        INVOICE: {
            OPEN: 'INVOICE.OPEN',
            PARTIALLY_PAID: 'INVOICE.PARTIALLY_PAID',
            FULLY_PAID: 'INVOICE.FULLY_PAID',
            OVER_PAID: 'INVOICE.OVER_PAID',
        },
    },
};

module.exports = constants;