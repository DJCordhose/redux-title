/* @flow */

type Action = {
    type: string,
    title: string
};

type Store = {
    getState(): any,
    subscribe(callback: () => void): () => void,
    dispatch(action: Action): void
};

// Action

export const UPDATE_TITLE = 'redux-title/UPDATE_TITLE';

// Action creator

export function updateTitle(title: string): Action {
    return {
        type: UPDATE_TITLE,
        title: title
    };
}

// Reducer

const initialState = (typeof document !== 'undefined' && document.title) || null;

export function titleReducer(state: any = initialState, action: Action) {
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

export function subscribeToTitle(getTitle: () => string, setTitle: (title: string) => void) {
    const titleElement = document.querySelector('title');
    const docEl = document.documentElement;

    function titleModified() {
        const title = document.title;
        const oldTitle = getTitle();
        if (oldTitle !== title) {
            setTitle(title);
        }
    }

    function subscribeAsObserver() {
        const observer = new MutationObserver(() => {
            titleModified();
        });
        observer.observe(titleElement, {childList: true});
        return () => observer.disconnect();
    }


    function subscribeIE() {
        // eslint-disable-next-line
        document.onpropertychange = function () {
            if (window.event.propertyName == 'title') {
                titleModified();
            }
        };
        // eslint-disable-next-line
        return () => document.onpropertychange = undefined;
    }

    function subscribeAsModification() {
        const type = 'DOMSubtreeModified';
        const listener = (evt) => {
            const t = evt.target;
            // eslint-disable-next-line
            if (t === titleElement || (t.parentNode && t.parentNode === titleElement)) {
                titleModified();
            }
        };
        docEl.addEventListener(type, listener, false);
        return () => docEl.removeEventListener(type, listener, false);
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
export function syncReduxAndTitle(store: Store, getTitle: (() => string) | void,
                                  setTitle: ((title: string) => void) | void) {

    const getTitleOrDefault = getTitle || (() => store.getState().title);
    const setTitleOrDefault = setTitle || (title => store.dispatch(updateTitle(title)));

    const unsubscribeFromTitle = subscribeToTitle(getTitleOrDefault, setTitleOrDefault);

    const unsubscribeStore = store.subscribe(() => {
        const title = getTitleOrDefault();
        const oldTitle = document.title;
        if (oldTitle !== title) {
            document.title = title;
        }
    });

    return function unsubscribe() {
        unsubscribeFromTitle();
        unsubscribeStore();
    };
}
