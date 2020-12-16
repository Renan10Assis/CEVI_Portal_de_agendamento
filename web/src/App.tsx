import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import MainRoutes from './routes';
import { store } from './store/index';
import DateFnsUtils from '@date-io/date-fns';//so pra usa o componente de data
import { MuiPickersUtilsProvider } from '@material-ui/pickers';//so pra usa o componente de data

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;