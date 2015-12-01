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
import {updateTitle} from '../../src/index'

function mapStateToProps(state) {
    return {
        title: state.title
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateTitle}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloMessage);
