import Immutable from "immutable";
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_EVENT = 'ADD_EVENT';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';

// ------------------------------------
// Actions
// ------------------------------------
export function addEvent(event) {
    return {
        type: ADD_EVENT,
        event,
    };
}

export function clearEvents() {
    return {
        type: CLEAR_EVENTS

,
    };
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_EVENT]: (state, action) => state.update('events', e => e.push(Immutable.fromJS(action.event))),
    [CLEAR_EVENTS]: (state) => state.set('events', new Immutable.List()),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Immutable.Map({
    events: new Immutable.List(),
});
export default function processReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
