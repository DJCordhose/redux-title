import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class HelloMessage extends React.Component {
    render() {
        const {title, updateTitle} = this.props;
        return (
            <div>
                <input onChange={event => updateTitle(event.target.value)}
                       value={title} />
                <p>Type into input field and see tab title change</p>
                <p>Also: Open your console and try <code>document.title = 'it works'</code> and see input field updated</p>
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
