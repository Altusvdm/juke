import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  startStream() {
    this.setState({
      stream: `<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=2057516484&app_id=1" width="700" height="350"></iframe>`
    });
  }

  stopStream() {
    this.setState({
      stream: null
    });
  }

  getIframe() {
    if (this.state.stream) {
      return <div dangerouslySetInnerHTML={{__html: this.state.stream}}/>;
    }
  }

  render() {
    console.log(this.props);
    return (<div>
      <div>Deezer test</div>
      <button onClick={this.startStream.bind(this)}>Start Stream</button>
      <button onClick={this.stopStream.bind(this)}>Stop Stream</button>
      { this.getIframe() }
    </div>);
  }
}

export default connect((state) => ({
  firebase: state.firebase
}))(App);
