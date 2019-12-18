import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk, logger));
store.subscribe(() => console.log(store.getState()));

export default store;