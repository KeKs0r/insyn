import {combineReducers} from "redux";
import locationReducer from "./location";
import process from "modules/process";

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location: locationReducer,
        process,
        ...asyncReducers
    })
}

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
