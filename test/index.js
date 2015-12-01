import expect from 'expect';
import { createStore, combineReducers } from 'redux';
import { updateTitle, UPDATE_TITLE, titleReducer, syncReduxAndTitle, subscribeToTitle } from '../src/index';

describe('syncReduxAndTitle', () => {

    let store;
    let unsubscribe;

    beforeEach(() => {
        document.title = '';
        store = createStore(combineReducers({
            title: titleReducer
        }));
        unsubscribe = syncReduxAndTitle(store);
    });

    afterEach(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    it('subscribeToTitle works', () => {
        let newTitle;
        const unsubscribe = subscribeToTitle(() => 'old', (title) => newTitle = title);
        document.title = 'new';
        unsubscribe();
        expect(newTitle).toEqual('new');
    });

    it('syncs redux -> title', () => {
        var title = 'yo';
        store.dispatch(updateTitle(title));
        expect(store.getState().title).toEqual(title);
        expect(document.title).toEqual(title);
    });

    it('syncs title -> redux', () => {
        var title = 'yo';
        document.title = title;
        expect(store.getState().title).toEqual(title);
        expect(document.title).toEqual(title);
    });
});
