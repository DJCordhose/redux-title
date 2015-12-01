import { createStore, combineReducers } from 'redux'
import {titleReducer, syncReduxAndTitle} from 'redux-title'

const store = createStore(combineReducers({
    title: titleReducer
}));

syncReduxAndTitle(store);

export default store;