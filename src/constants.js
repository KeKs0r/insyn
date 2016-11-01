const constants = {
    ACTIONS: {
        ORDER: {
            CREATE_ORDER: 'ORDER.CREATE_ORDER',
            CONFIRM_ORDER: 'ORDER.CONFIRM_ORDER',
        },
        INVOICE: {
            CREATE_INVOICE: 'INVOICE.CREATE_INVOICE',
        },
    },
    STATUS: {
        ORDER: {
            OPEN: 'STATUS_ORDER_OPEN',
            CONFIRMED: 'STATUS_ORDER_CONFIRMED',
        },
        INVOICE: {
            OPEN: 'STATUS_INVOICE_OPEN',
        },
    },
};

module.exports = constants;