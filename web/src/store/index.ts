/* import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import {categoriesReducer} from './ducks/reducers/categories';
import {establishmentsReducer} from './ducks/reducers/establishments';
import { AppActions } from './ducks/types/actions';



const rootReducer = combineReducers({
    //categories: categoriesReducer,
    //establishments: establishmentsReducer
    
}, );

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)); */