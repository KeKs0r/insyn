const Async = require('async');
const { head } = require('lodash');
const Immutable = require('immutable');
// ------------------------------------
// App
// ------------------------------------
const TestApp = require('../../../test/util/TestApp');
const { app, bus, customerStore } = TestApp;
const Process = require('../../../test/fixtures/first');
const { ACTIONS, STATUS } = require('../../../src/constants');

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CUSTOMER_CLASS = 'SET_CUSTOMER_CLASS';

const { addEvent, clearEvents } = require('./process');

export const playProcess = () => {
    let order;
    let invoice;
    return (dispatch, getState) => {


        const customerClass = getState().demo.get('customerClass');
        const customer = customerStore.get('15');
        customer.classification = customerClass;
        customerStore.set('15', customer);

        dispatch(clearEvents());
        const handler = (result) => {
            if (result.result.status === STATUS.INVOICE.OPEN) {
                invoice = result.result;
            }
            dispatch(addEvent(result));
        };
        bus.on('result:*', handler);
        Async.series([
            (next) => {
                const step = Process[ACTIONS.ORDER.CREATE_ORDER];
                const result = app.handle(step);
                order = head(result).result;
                setTimeout(next, 2000);
            },
            (next) => {
                const actionGenerator = Process[ACTIONS.ORDER.CONFIRM_ORDER];
                const action = actionGenerator(order.id);
                app.handle(action);
                setTimeout(next, 2000);
            },
            (next) => {
                const actionGenerator = Process[ACTIONS.INVOICE.PAY_INVOICE];
                const action = actionGenerator(invoice.id);
                app.handle(action);
                setTimeout(next, 2000);
            }
        ], () => {
            bus.off('result:*', handler);
        });
    };
}

export const setCustomerClass = (classification) => {
    return {
        type: SET_CUSTOMER_CLASS,
        classification,
    };
}

const ACTION_HANDLERS = {
    [SET_CUSTOMER_CLASS]: (state, action) => state.set('customerClass', action.classification),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Immutable.Map({
    customerClass: 'B',
});
export default function demoReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
}
