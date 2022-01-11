import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import configureStore from './store/store'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

let store
if (window.currentUser) {
  const currentUser = window.currentUser
  const preloadedState = {
    session: { currentUserId: currentUser.id },
    entities: {
      users: { [currentUser.id]: currentUser }
    }
  }
  store = configureStore(preloadedState)
  delete window.currentUser
} else {
  store = configureStore()
}

window.store = store

ReactDOM.render(
  <React.StrictMode>
    <Root store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);
