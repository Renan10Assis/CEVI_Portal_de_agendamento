import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import {empresasReducer} from './ducks/reducers/Empresa';
import {enderecosReducer} from './ducks/reducers/Endereco';
import {motoristasReducer} from './ducks/reducers/Motorista';
import {usuariosReducer} from './ducks/reducers/Usuario';
import {authUsuarioReducer} from './ducks/reducers/AuthUsuario';
import {navigationReducer} from './ducks/reducers/Navigation';
import {viagemStatusReducer} from './ducks/reducers/ViagemStatus';
import {viagensReducer} from './ducks/reducers/Viagem';
import { AppActions } from './ducks/types/actions';



const rootReducer = combineReducers({
    navigation: navigationReducer,
    empresas: empresasReducer,
    enderecos: enderecosReducer,
    motoristas: motoristasReducer,
    viagemStatus: viagemStatusReducer,
    usuarios: usuariosReducer,
    authUsuarios: authUsuarioReducer,
    viagens: viagensReducer
    
}, );

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));
