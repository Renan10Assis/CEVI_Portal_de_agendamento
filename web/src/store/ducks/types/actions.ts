import {Empresa} from './Empresa';
import {Endereco} from './Endereco';
import {Motorista} from './Motorista';
import {Usuario} from './Usuario';
import {AuthUsuario} from './AuthUsuario';
import {Viagem} from './Viagem';
import { Navigation } from './Navigation';
import { ViagemStatus } from './ViagemStatus';


//empresa - types
export const SET_EMPRESAS = 'SET_EMPRESAS';
export const CREATE_EMPRESA = 'CREATE_EMPRESA';
export const UPDATE_EMPRESA = 'UPDATE_EMPRESA';


//endereco - types
export const SET_ENDERECOS = 'SET_ENDERECOS';
export const CREATE_ENDERECO = 'CREATE_ENDERECO';
export const DELETE_ENDERECO = 'DELETE_ENDERECO';

//Motorista - types
export const SET_MOTORISTAS = 'SET_MOTORISTAS';
export const CREATE_MOTORISTA = 'CREATE_MOTORISTA';
export const UPDATE_MOTORISTA = 'UPDATE_MOTORISTA';

//Usuário - types
export const SET_USUARIOS= 'SET_USUARIOS';
export const CREATE_USUARIO = 'CREATE_USUARIO';

export const AUTH_USUARIO = 'AUTH_USUARIO';
export const LOGOUT_USUARIO = 'LOGOUT_USUARIO';

export const UPDATE_USUARIO = 'UPDATE_USUARIO';
export const UPDATE_IMAGE_USUARIO = 'UPDATE_IMAGE_USUARIO';
export const UPDATE_SENHA_USUARIO = 'UPDATE_SENHA_USUARIO';
export const UPDATE_EMAIL_USUARIO = 'UPDATE_EMAIL_USUARIO';
export const DELETE_USUARIO = 'DELETE_USUARIO';

//Viagem - types
export const SET_VIAGENS = 'SET_VIAGENS';
export const CREATE_VIAGEM = 'CREATE_VIAGEM';
export const UPDATE_MOT_VIAGEM = 'UPDATE_MOT_VIAGEM';
export const UPDATE_STATUS_VIAGEM = 'UPDATE_STATUS_VIAGEM';

//Navigation - types
export const SET_NAVIGATION = 'SET_NAVIGATION';
export const REMOVE_NAVIGATION = 'REMOVE_NAVIGATION';

//Navigation - types
export const SET_VIAGEM_STATUS = 'SET_VIAGEM_STATUS';
export const REMOVE_VIAGEM_STATUS = 'REMOVE_VIAGEM_STATUS';

//---------------------------------- ACTION TYPES -----------------------------

// Empresa -------------------------------
export interface SetEmpresasAction{
    type: typeof SET_EMPRESAS;
    empresas: Empresa[];
}

export interface createEmpresasAction{
    type: typeof CREATE_EMPRESA;
    data: Empresa;
}

export interface updateEmpresaAction{
    type: typeof UPDATE_EMPRESA;
    data: Empresa;
}

export type EmpresaActionTypes = SetEmpresasAction | createEmpresasAction | updateEmpresaAction



//Endereco -------------------------------
export interface SetEnderecosAction{
    type: typeof SET_ENDERECOS;
    enderecos:Endereco[];
}

export interface createEnderecoAction{
    type: typeof CREATE_ENDERECO;
    data: Endereco;
}

export interface deleteEnderecoAction{
    type: typeof DELETE_ENDERECO;
    end_id: string;
}

export type EnderecoActionTypes = SetEnderecosAction | createEnderecoAction | deleteEnderecoAction



//Motorista --------------------------------
export interface SetMotoristasAction{
    type: typeof SET_MOTORISTAS; 
    motoristas: Motorista[];
}

export interface createMotoristaAction{
    type: typeof CREATE_MOTORISTA;
    data: Motorista;
}

export interface updateMotoristaAction{
    type: typeof UPDATE_MOTORISTA;
    data: Motorista;
}

export type MotoristaActionTypes = SetMotoristasAction | createMotoristaAction | updateMotoristaAction



//Usuario ----------------------------------
export interface SetUsuariosAction{
    type: typeof SET_USUARIOS;
    usuarios: Usuario[];
}

export interface createUsuarioAction{
    type: typeof CREATE_USUARIO;
    data: Usuario;
}

export interface authUsuarioAction{
    type: typeof AUTH_USUARIO;
    data: AuthUsuario;
}
export interface logoutUsuarioAction{
    type: typeof LOGOUT_USUARIO;
}

export interface updateUsuarioAction{
    type: typeof UPDATE_USUARIO;
    data: Usuario;
}

export interface updateImageUsuarioAction{
    type: typeof UPDATE_IMAGE_USUARIO;
    data: Usuario;
}

export interface updateSenhaUsuarioAction{
    type:typeof UPDATE_SENHA_USUARIO;
    data: Usuario;
}

export interface updateEmailUsuarioAction{
    type: typeof UPDATE_EMAIL_USUARIO;
    data: Usuario;
}

export interface deleteUsuarioAction{
    type: typeof DELETE_USUARIO;
    usu_id: string;
}

export type UsuarioActionTypes = SetUsuariosAction | createUsuarioAction | authUsuarioAction | logoutUsuarioAction | updateUsuarioAction | updateImageUsuarioAction | updateSenhaUsuarioAction | updateEmailUsuarioAction | deleteUsuarioAction



// Viagem ---------------------------------------
export interface SetViagensAction{
    type: typeof SET_VIAGENS;
    viagens: Viagem[];
}

export interface createViagemAction{
    type: typeof CREATE_VIAGEM;
    data: Viagem;
}

export interface updateMotViagemAction{
    type: typeof UPDATE_MOT_VIAGEM;
    data: Viagem;
}

export interface updateStatusViagemAction{
    type: typeof UPDATE_STATUS_VIAGEM;
    data: Viagem;
}

export type ViagemActionTypes = SetViagensAction | createViagemAction | updateMotViagemAction | updateStatusViagemAction



//---Navigation action types
export interface setNavigation{
    type: typeof SET_NAVIGATION,
    data: Navigation
}

export interface removeNavigation{
    type: typeof REMOVE_NAVIGATION,
}

export type NavigationActionTypes = setNavigation | removeNavigation


//---ViagemStatus action types
export interface setViagemStatus{
    type: typeof SET_VIAGEM_STATUS,
    data: ViagemStatus 
}

export interface removeViagemStatus{
    type: typeof REMOVE_VIAGEM_STATUS,
}

export type ViagemStatusActionTypes = setViagemStatus | removeViagemStatus


//---- Unindo todas as Action Types de todas das classes ----
export type AppActions = ViagemStatusActionTypes | NavigationActionTypes | EmpresaActionTypes | EnderecoActionTypes | MotoristaActionTypes | UsuarioActionTypes | ViagemActionTypes