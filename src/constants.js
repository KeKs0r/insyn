const actions = {
    CREATE_ORDER: 'ORDER.CREATE_ORDER',
    CREATE_INVOICE: 'INVOICE.CREATE_INVOICE',
    STATUS: {
        ORDER: {
            OPEN: 'STATUS_ORDER_OPEN',
        },
        INVOICE: {
            OPEN: 'STATUS_INVOICE_OPEN',
        },
    },
};

module.exports = actions;