import {Empresa} from './Empresa';
import {Endereco} from './Endereco';
import {Motorista} from './Motorista';
import {Usuario} from './Usuario';
import {Viagem} from './Viagem';


//empresa - types
export const INDEX_EMPRESA = 'INDEX_EMPRESA';
export const CREATE_EMPRESA = 'CREATE_EMPRESA';
export const UPDATE_EMPRESA = 'UPDATE_EMPRESA';


//endereco - types
export const INDEX_ENDERECO = 'INDEX_ENDERECO';
export const SHOW_ENDERECO = 'SHOW_ENDERECO';
export const CREATE_ENDERECO = 'CREATE_ENDERECO';
export const DELETE_ENDERECO = 'DELETE_ENDERECO';

//Motorista - types
export const INDEX_MOTORISTA = 'INDEX_MOTORISTA';
export const CREATE_MOTORISTA = 'CREATE_MOTORISTA';
export const UPDATE_MOTORISTA = 'UPDATE_MOTORISTA';

//Usuário - types
export const INDEX_USUARIO = 'INDEX_USUARIO';
export const CREATE_USUARIO = 'CREATE_USUARIO';
export const AUTH_USUARIO = 'AUTH_USUARIO';
export const UPDATE_USUARIO = 'UPDATE_USUARIO';
export const UPDATE_IMAGE_USUARIO = 'UPDATE_IMAGE_USUARIO';
export const UPDATE_SENHA_USUARIO = 'UPDATE_SENHA_USUARIO';
export const UPDATE_EMAIL_USUARIO = 'UPDATE_EMAIL_USUARIO';
export const DELETE_USUARIO = 'DELETE_USUARIO';

//Viagem - types
export const INDEX_VIAGEM = 'INDEX_VIAGEM';
export const SHOW_VIAGEM = 'SHOW_VIAGEM';
export const CREATE_VIAGEM = 'CREATE_VIAGEM';
export const UPDATE_MOT_VIAGEM = 'UPDATE_MOT_VIAGEM';
export const UPDATE_STATUS_VIAGEM = 'UPDATE_STATUS_VIAGEM';



//---------------------------------- ACTION TYPES -----------------------------

// Empresa -------------------------------
export interface indexEmpresa{
    type: typeof INDEX_EMPRESA;
    data: Empresa[];
}

export interface createEmpresa{
    type: typeof CREATE_EMPRESA;
    data: Empresa;
}

export interface updateEmpresa{
    type: typeof UPDATE_EMPRESA;
    data: Empresa;
}

export type EmpresaActionTypes = indexEmpresa | createEmpresa | updateEmpresa



//Endereco -------------------------------
export interface indexEndereco{
    type: typeof INDEX_ENDERECO;
    data:Endereco[];
}

export interface showEndereco{
    type: typeof SHOW_ENDERECO;
    data: Endereco[];
}

export interface deleteEndereco{
    type: typeof DELETE_ENDERECO;
    end_id: string;
}

export type EnderecoActionTypes = indexEndereco | showEndereco | deleteEndereco



//Motorista --------------------------------
export interface indexMotorista{
    type: typeof INDEX_MOTORISTA; 
    data: Motorista[];
}

export interface createMotorista{
    type: typeof CREATE_MOTORISTA;
    data: Motorista;
}

export interface updateMotorista{
    type: typeof UPDATE_MOTORISTA;
    mot_id: string;
}

export type MotoristaActionTypes = indexMotorista | createMotorista | updateMotorista



//Usuario ----------------------------------
export interface indexUsuario{
    type: typeof INDEX_USUARIO;
    data: Usuario[];
}

export interface createUsuario{
    type: typeof CREATE_USUARIO;
    data: Usuario;
}

export interface authUsuario{
    type: typeof AUTH_USUARIO;
    data: Usuario;
}

export interface updateUsuario{
    type: typeof UPDATE_USUARIO;
    usu_id: string;
}

export interface updateImageUsuario{
    type: typeof UPDATE_IMAGE_USUARIO;
    usu_img: string;
}

export interface updateSenhaUsuario{
    type:typeof UPDATE_SENHA_USUARIO;
    usu_senha: string;
}

export interface updateEmailUsuario{
    type: typeof UPDATE_EMAIL_USUARIO;
    usu_email: string;
}

export interface deleteUsuario{
    type: typeof DELETE_USUARIO;
    usu_id: string;
}

export type UsuarioActionTypes = indexUsuario | createUsuario | authUsuario | updateUsuario | updateImageUsuario | updateSenhaUsuario | updateEmailUsuario | deleteUsuario



// Viagem ---------------------------------------
export interface indexViagem{
    type: typeof INDEX_VIAGEM;
    data: Viagem[];
}

export interface showViagem{
    type: typeof SHOW_VIAGEM;
    data: Viagem[];
}

export interface createViagem{
    type: typeof CREATE_VIAGEM;
    data: Viagem;
}

export interface updateMotViagem{
    type: typeof UPDATE_MOT_VIAGEM;
    mot_id: string;
}

export interface updateStatusViagem{
    type: typeof UPDATE_STATUS_VIAGEM;
    via_os: string;
}

export type ViagemActionTypes = indexViagem | showViagem | createViagem | updateMotViagem | updateStatusViagem


//---- Unindo todas as Action Types de todas das classes ----
export type AppActions = EmpresaActionTypes | EnderecoActionTypes | MotoristaActionTypes | UsuarioActionTypes | ViagemActionTypes