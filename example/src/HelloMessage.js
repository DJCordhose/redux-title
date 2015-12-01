import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class HelloMessage extends React.Component {
    render() {
        const {greeting, updateGreeting} = this.props;
        return (
            <div>
                <input ref="in"
                       onChange={event => updateGreeting(event.target.value)}
                       value={greeting} />
                <p>{greeting}, World</p>
                <button
                    onClick={() => {
                        updateGreeting('');
                        this.refs.in.focus();
                    }}>
                    Clear
                </button>
            </div>);
    }
}
import * as Actions from './actions';

function mapStateToProps(state) {
    return {
        greeting: state.greeting
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloMessage);
