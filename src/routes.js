import React from 'react';
import { Route } from 'react-router';
import App from './containers/App/App';
import { setupFirebase } from 'libs/firebase';

export default (store) => {
  setupFirebase(store);

  return (
    <Route path="/" component={App} />
  );
};
