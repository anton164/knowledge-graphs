import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { initializeFirebase } from './api/firebase';
import './spy';

initializeFirebase();
ReactDOM.render(<App />, document.querySelector('#container'));

if (module && module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear();
  });
}
