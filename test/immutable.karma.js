// tests showing how to use redux-title with immutable.js
//
// https://facebook.github.io/immutable-js/
// https://github.com/gajus/redux-immutable
// https://github.com/indexiatech/redux-immutablejs
// https://github.com/erikras/redux-form
// https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/

import expect from 'expect'
import Immutable from 'immutable'
import {combineReducers} from 'redux-immutable';
import { createStore } from 'redux'
import { updateTitle, titleReducer, syncReduxAndTitle } from '../src/index'


describe('syncReduxAndTitle with immutable.js', () => {

    let store;
    let unsubscribe;

    beforeEach(() => {
        document.title = '';
        const initialState = Immutable.Map();
        const rootReducer = combineReducers({
            title: titleReducer
        });
        store = createStore(rootReducer, initialState);
        const getTitle = () => store.getState().get('title');
        unsubscribe = syncReduxAndTitle(store, getTitle);
    });

    afterEach(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    it('syncs redux -> title', () => {
        var title = 'yo';
        store.dispatch(updateTitle(title));
        expect(store.getState().get('title')).toEqual(title);
        expect(document.title).toEqual(title);
    });

    it('syncs title -> redux', () => {
        var title = 'yoho';
        document.title = title;
        expect(store.getState().get('title')).toEqual(title);
        expect(document.title).toEqual(title);
    });
});
