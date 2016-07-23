import Firebase from 'firebase';
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

class FirebaseManager {
  constructor(store) {
    this.store = store;
    this.baseUrl = __FIREBASE_URL__;
    this.registerFirebase();
  }

  registerFirebase() {
    console.log('registerFirebase', this.baseUrl);
    this.firebaseRef = new Firebase(`${this.baseUrl}`);
    this.registerEvent(this.firebaseRef, (dataSnapshot) => {
      console.log('got me data', dataSnapshot.val());
      this.store.dispatch(updateData(dataSnapshot.val()));
    });
  }

  registerEvent(ref, updateCallback) {
    ref.on('value', updateCallback).bind(this);
  }
}
