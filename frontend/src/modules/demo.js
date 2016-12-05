const Async = require('async');
// ------------------------------------
// App
// ------------------------------------
const { app, bus } = require('../../../test/util/TestApp');
const Process = require('../../../test/fixtures/first');

const { addEvent, clearEvents } = require('./process');

export const playProcess = () => {
    return (dispatch) => {
        dispatch(clearEvents());
        const handler = (result) => {
            dispatch(addEvent(result));
        };
        bus.on('result:*', handler);
        Async.eachSeries(Process, (step, next) => {
            app.handle(step);
            setTimeout(next, 2000);
        }, () => {
            bus.off('result:*', handler);
        });
    };
}

export const actions = {
    playProcess,
}
