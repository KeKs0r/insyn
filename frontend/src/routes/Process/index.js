import _ProcessView from "./components/ProcessView";
import ProcessContainer from "./containers/ProcessContainer";
import _EventView from "./components/EventView";
import EventContainer from "./containers/EventContainer";

const ProcessView = ProcessContainer(_ProcessView);
const EventView = EventContainer(_EventView);


export default (store) => ({
    path: 'process/:type',
    component: ProcessView,
    /*  Async getComponent is only invoked when route matches   */
    // getComponent (nextState, cb) {
    //     /*  Webpack - use 'require.ensure' to create a split point
    //      and embed an async module loader (jsonp) when bundling   */
    //     require.ensure([], (require) => {
    //         /*  Webpack - use require callback to define
    //          dependencies for bundling   */
    //         const Process = require('./containers/ProcessContainer').default
    //
    //         /*  Add the reducer to the store on key 'counter'  */
    //         // injectReducer(store, { key: 'counter', reducer })
    //
    //         /*  Return getComponent   */
    //         cb(null, Process)
    //
    //         /* Webpack named bundle   */
    //     }, 'process')
    // },
    childRoutes: [
        {
            path: 'event/:uuid',
            component: EventView
        }
    ]
});
