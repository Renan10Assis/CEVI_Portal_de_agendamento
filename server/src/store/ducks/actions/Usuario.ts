import {Usuario} from "../types/Usuario";
import {AppActions} from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../..";


export const setUsuarios = (usuarios: Usuario[]): AppActions =>({
    type: "SET_USUARIOS",
    usuarios
});

export const createUsuario = (data:Usuario):AppActions =>({
    type: "CREATE_USUARIO",
    data
});


export const updateUsuario = (data:Usuario): AppActions =>({
    type: "UPDATE_USUARIO",
    data
});

export const updateImageUsuario = (data:Usuario):AppActions=>({
    type: "UPDATE_IMAGE_USUARIO",
    data
});

export const updateSenhaUsuario = (data:Usuario):AppActions=>({
    type: "UPDATE_SENHA_USUARIO",
    data
});

export const updateEmailUsuario = (data:Usuario):AppActions=>({
    type: "UPDATE_EMAIL_USUARIO",
    data
});

export const deleteUsuario = (usu_id: string):AppActions=>({
    type: "DELETE_USUARIO",
    usu_id
});




//----- thunk 
export const startSetUsuarios = (usuarios: Usuario[]) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(setUsuarios(usuarios));
    };

};


export const startCreateUsuario = (usuarioData: {
    usu_id: string;
    usu_nome: string;
    usu_email:string;
    usu_senha:string;
    usu_emp_id: string;
    usu_tipo: string;
    usu_status:string;
    usu_imagem:string;
}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const {
            usu_id = "",
            usu_nome= "",
            usu_email= "",
            usu_senha= "",
            usu_emp_id= "",
            usu_tipo= "",
            usu_status= "",
            usu_imagem= ""
        } = usuarioData;
        const usuario = { usu_id, usu_nome, usu_email, usu_senha, usu_emp_id, usu_tipo, usu_status, usu_imagem};

        dispatch(
            createUsuario({
                ...usuario
            })
        );
    };
};


export const startUpdateUsuario = (data: Usuario) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(updateUsuario(data));
    };
};

export const startUpdateImageUsuario = (data: Usuario) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(updateImageUsuario(data));
    };
};

export const startUpdateSenhaUsuario = (data: Usuario) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(updateSenhaUsuario(data));
    };
};

export const startUpdateEmailUsuario = (data: Usuario) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(updateEmailUsuario(data));
    };
};

export const startDeleteUsuario = (usu_id: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(deleteUsuario(usu_id));
    };
};

