'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateTitle = updateTitle;
exports.titleReducer = titleReducer;
exports.subscribeToTitle = subscribeToTitle;
exports.syncReduxAndTitle = syncReduxAndTitle;


// Action

var UPDATE_TITLE = exports.UPDATE_TITLE = 'redux-title/UPDATE_TITLE';

// Action creator

function updateTitle(title) {
    return {
        type: UPDATE_TITLE,
        title: title
    };
}

// Reducer

var initialState = typeof document !== 'undefined' && document.title || null;

function titleReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type === UPDATE_TITLE) {
        return action.title;
    }
    return state;
}

// Syncing

// http://stackoverflow.com/questions/2497200/how-to-listen-for-changes-to-the-title-element
// https://developer.mozilla.org/en/docs/Web/API/MutationObserver
// http://caniuse.com/#feat=mutationobserver
// https://msdn.microsoft.com/en-us/library/ms536956(v=vs.85).aspx

function subscribeToTitle(getTitle, setTitle) {
    var titleElement = document.querySelector('title');
    var docEl = document.documentElement;

    function titleModified() {
        var title = document.title;
        var oldTitle = getTitle();
        if (oldTitle !== title) {
            setTitle(title);
        }
    }

    function subscribeAsObserver() {
        var observer = new MutationObserver(function () {
            titleModified();
        });
        observer.observe(titleElement, { childList: true });
        return function () {
            return observer.disconnect();
        };
    }

    function subscribeIE() {
        // eslint-disable-next-line
        document.onpropertychange = function () {
            if (window.event.propertyName == 'title') {
                titleModified();
            }
        };
        // eslint-disable-next-line
        return function () {
            return document.onpropertychange = undefined;
        };
    }

    function subscribeAsModification() {
        var type = 'DOMSubtreeModified';
        var listener = function listener(evt) {
            var t = evt.target;
            // eslint-disable-next-line
            if (t === titleElement || t.parentNode && t.parentNode === titleElement) {
                titleModified();
            }
        };
        docEl.addEventListener(type, listener, false);
        return function () {
            return docEl.removeEventListener(type, listener, false);
        };
    }

    if (docEl && docEl.addEventListener) {
        return subscribeAsModification();
        // stangely does not work in chrome when started over karma
    } else if (typeof MutationObserver !== 'undefined') {
        return subscribeAsObserver();
    } else {
        return subscribeIE();
    }
}

/**
 *
 * @param store the redux store
 * @param getTitle your function to get the title from the redux store (optional)
 * @param setTitle your function to set the title to the redux store (optional)
 * @returns unsubscribe function
 */
function syncReduxAndTitle(store, getTitle, setTitle) {

    var getTitleOrDefault = getTitle || function () {
        return store.getState().title;
    };
    var setTitleOrDefault = setTitle || function (title) {
        return store.dispatch(updateTitle(title));
    };

    var unsubscribeFromTitle = subscribeToTitle(getTitleOrDefault, setTitleOrDefault);

    var unsubscribeStore = store.subscribe(function () {
        var title = getTitleOrDefault();
        var oldTitle = document.title;
        if (oldTitle !== title) {
            document.title = title;
        }
    });

    return function unsubscribe() {
        unsubscribeFromTitle();
        unsubscribeStore();
    };
}
