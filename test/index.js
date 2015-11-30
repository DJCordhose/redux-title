import expect from 'expect';
//import jsdom from 'mocha-jsdom';
import { createStore, combineReducers } from 'redux';
import { updateTitle, UPDATE_TITLE, titleReducer, syncReduxAndTitle } from '../src/index';

function createSyncedTitleAndStore() {
    const store = createStore(combineReducers({
        title: titleReducer
    }));
    syncReduxAndTitle(store);
    return store;
}

describe('syncReduxAndTitle', () => {
    //jsdom();
    it('syncs title -> redux', () => {
        const store = createSyncedTitleAndStore();
        store.dispatch(updateTitle('yo'))
        expect(store.getState().title).toEqual('yo');
        //expect(document.title).toEqual('yo');
    });
});
