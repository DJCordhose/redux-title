import { createStore, combineReducers } from 'redux'

import {UPDATE_GREETING} from './actions'

function greetingReducer(state = 'Hello', action) {
    if (action.type === UPDATE_GREETING) {
        return action.greeting;
    }
    return state;
}
const store = createStore(combineReducers({
    greeting: greetingReducer
}));

export default store;