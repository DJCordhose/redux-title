# redux-title

This library provides synchronization of the document title and redux state.
This means when you update `document.title` you will see an updated redux state and
when you update the redux state `document.title` will be update as well.

This allows you to deal with the `document.title` consistent with redux.
You just alter state using actions and reducers and get state containing the title from the redux store.

The library was created because of my complete cluelessness how to deal with changing titles in a redux/react-router application.
As it seems I was not the only one who had no clue, I tried my best and created this very simple piece of code.

It is inspired by the way [redux-simple-router](https://github.com/jlongster/redux-simple-router) works
and the first version is also based on a copy of the source of that library. So, kudos to James!


## How to Use It

The main idea is very simple:
- add mutual listeners to redux store and `document.title`
- call an action creator that changes redux state
- get the title through the redux store like any other state
- automatically get updates of the initial or changed `document.title`

There is not a lot of documentation, yet.
Check out this [simple example](https://github.com/DJCordhose/redux-title/tree/master/example) which is
part of this repository. The [tests](https://github.com/DJCordhose/redux-title/tree/master/example) also are a good example of how to use this lib.

Here is a little bit of code from the example how to set up `redux-title`:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { titleReducer, syncReduxAndTitle } from 'redux-title'
import { Provider } from 'react-redux'

const store = createStore(combineReducers({
    title: titleReducer
}));

syncReduxAndTitle(store);

import HelloMessage from './HelloMessage'

React.render(
  <Provider store={store}>
    <HelloMessage />
  </Provider>,
  document.getElementById('mount')
)
```

And this is how you can display and change the title:

```js
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class HelloMessage extends React.Component {
    render() {
        const {title, updateTitle} = this.props;
        return (
            <div>
                <input ref="in"
                       onChange={event => updateTitle(event.target.value)}
                       value={title} />
                <p>{title}</p>
                <button
                    onClick={() => {
                        updateTitle('');
                        this.refs.in.focus();
                    }}>
                    Clear
                </button>
            </div>);
    }
}
import {updateTitle} from 'redux-title'

function mapStateToProps(state) {
    return {
        title: state.title
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateTitle}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloMessage);
```

