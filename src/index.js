export const UPDATE_TITLE = "redux-title/UPDATE_TITLE";

// Action creator

export function updateTitle(title) {
    return {
        type: UPDATE_PATH,
        title: title
    }
}

// Reducer

const initialState = {
    title: undefined
};

export function titleReducer(state = initialState, action) {
    if (action.type === UPDATE_TITLE) {
        return {
            title: action.title
        };
    }
    return state;
}

// Syncing

export function syncReduxAndTitle(store) {
    // https://developer.mozilla.org/en/docs/Web/API/MutationObserver
    // TODO: Will not work in pre IE11
    // http://caniuse.com/#feat=mutationobserver
    // Need to implement something like this
    // https://msdn.microsoft.com/en-us/library/ms536956(v=vs.85).aspx

    const titleElement = document.querySelector('title');
    const observer = new MutationObserver(() => {
        const title = document.title;
        const oldTitle = store.getState().title;
        if (oldTitle !== title) {
            store.dispatch(updateTitle(title))
        }
    });
    observer.observe(titleElement, {childList: true});
    function unsubscribeTitle() {
        observer.disconnect();
    }

    const unsubscribeStore = store.subscribe(() => {
        const title = store.getState().title;
        const oldTitle = document.title;
        if (oldTitle !== title) {
            document.title = title;
        }
    });

    return function unsubscribe() {
        unsubscribeTitle();
        unsubscribeStore();
    };
}
