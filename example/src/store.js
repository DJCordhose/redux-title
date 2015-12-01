import { createStore, combineReducers } from 'redux'
import {titleReducer, syncReduxAndTitle} from '../../src/index'

const store = createStore(combineReducers({
    title: titleReducer
}));

syncReduxAndTitle(store);

export default store;