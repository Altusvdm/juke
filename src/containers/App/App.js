import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setIframe, setPlayingState } from 'libs/firebase';
import { Map } from 'immutable';
import $ from 'jquery';

const SESSION = 'altus';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  firebaseSession() {
    if (!__SERVER__) {
      console.log(this.props.firebase);
      return this.props.firebase.get(SESSION) || Map({});
    }

    return Map({});
  }

  startStream() {
    setIframe(SESSION, `<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=2057516484&app_id=1" width="700" height="350"></iframe>`);
  }

  stopStream() {
    setIframe(SESSION, '');
  }

  getIframe() {
    if (this.firebaseSession().get('playing') === true) {
      return <div dangerouslySetInnerHTML={{__html: this.firebaseSession().get('iframe')}}/>;
    }
  }

  setPlaying(playingState) {
    setPlayingState(SESSION, playingState);
  }

  search(string, type) {
    $.ajax({
      url: `http://api.deezer.com/search/${type}?q=${string}`,
      success: (response) => {
        console.log(response);
      }
    })
  }

  render() {
    return (<div>
      <div>Deezer test</div>
      <div>
        <button onClick={this.startStream.bind(this)}>Set Stream</button>
        <button onClick={this.stopStream.bind(this)}>Remove Stream</button>
      </div>
      <div>
        <button onClick={() => { this.setPlaying(true); }}>Start Playing</button>
        <button onClick={() => { this.setPlaying(false); }}>Stop Playing</button>
      </div>

      <div>
        Album:
        <input onChange={(event) => { this.setState({album: event.target.value})}} value={this.state.album}/>
        <button onClick={() => { this.search(this.state.album, 'album')}}>Search</button>
      </div>
      { this.getIframe() }
    </div>);
  }
}

export default connect((state) => ({
  firebase: state.firebase || Map({})
}))(App);
