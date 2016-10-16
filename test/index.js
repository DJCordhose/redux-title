import expect from 'expect'
import { createStore, combineReducers } from 'redux'
import { updateTitle, UPDATE_TITLE, titleReducer, syncReduxAndTitle, subscribeToTitle } from '../src/index'

// TODO Tests no longer run properly without real DOM as document.title change does not seem to trigger event with JSDOM
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

    xit('subscribe works', () => {
        let newTitle;
        const unsubscribe = subscribeToTitle(() => 'old', (title) => newTitle = title);
        document.title = 'new';
        expect(newTitle).toEqual('new');
    });

    xit('unsubscribe works', () => {
        let newTitle = 'unset';
        const unsubscribe = subscribeToTitle(() => 'old', (title) => newTitle = title);
        unsubscribe();
        document.title = 'no effect';
        expect(newTitle).toEqual('unset');
    });

    it('syncs redux -> title', () => {
        var title = 'yo';
        store.dispatch(updateTitle(title));
        expect(store.getState().title).toEqual(title);
        expect(document.title).toEqual(title);
    });

    xit('syncs title -> redux', () => {
        var title = 'yo';
        document.title = title;
        expect(store.getState().title).toEqual(title);
        expect(document.title).toEqual(title);
    });
});
