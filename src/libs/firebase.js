import firebase from 'firebase';
import { updateData } from 'redux/modules/firebase';

let _firebase = undefined;

export function setupFirebase(store) {
  if (!__SERVER__) {
    if (_firebase === undefined) {
      _firebase = new FirebaseManager(store);
    }
  }

  return _firebase;
}

export function setIframe(session, iframe) {
  _firebase.setIframe(session, iframe);
}

export function setPlayingState(session, playingState) {
  _firebase.setPlayingState(session, playingState);
}

class FirebaseManager {
  constructor(store) {
    this.store = store;
    this.app = firebase.initializeApp({
      apiKey: 'AIzaSyDm2aXRHmxqHS2lVmX7B7VIZ08IdlSpDKQ',
      authDomain: 'deezer-test.firebaseapp.com',
      databaseURL: 'https://deezer-test.firebaseio.com'
    });
    this.registerFirebase();
  }

  registerFirebase() {
    this.app.database().ref('sessions').on('value', (dataSnapshot) => {
      this.store.dispatch(updateData(dataSnapshot.val()));
    });
  }

  setIframe(session, iframe) {
    this.app.database().ref(`sessions/${session}`).set({'iframe': iframe, 'playing': false}, (error) => {
      console.log(error);
    });
  }

  setPlayingState(session, playingState) {
    this.app.database().ref(`sessions/${session}/playing`).set(playingState, (error) => {
      console.log(error);
    });
  }
}
