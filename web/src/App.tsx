import React from 'react';
import {Provider} from 'react-redux';
import './App.css';

import Route from './routes';
import {store} from './store/index';

function App() {
  return (
    <Provider store={store}>
      <Route />  
    </Provider>
  );
}

export default App;