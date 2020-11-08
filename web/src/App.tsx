import React from 'react';
import {Provider} from 'react-redux';
import './App.css';
import MainRoutes from './routes';
import {store} from './store/index';

function App() {
  return (
    <Provider store={store}>
      <MainRoutes />  
    </Provider>
  );
}

export default App;