import {combineReducers} from "redux";
import locationReducer from "./location";
import process from "modules/process";
import demo from "modules/demo";

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location: locationReducer,
        process,
        demo,
        ...asyncReducers
    })
}

export const injectReducer = (store, { key, reducer }) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
