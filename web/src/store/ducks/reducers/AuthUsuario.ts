import { AuthUsuario } from "../types/AuthUsuario";
import { UsuarioActionTypes } from "../types/actions";

const AuthUsuarioReducerDefaultState: AuthUsuario = {
    usu_id:"",
    usu_nome:"",
    usu_email:"",
    usu_tipo:"",
    usu_imagem:"",
    emp_id:"",
    emp_nomeFantasia:""
};

const authUsuarioReducer = (state = AuthUsuarioReducerDefaultState, action: UsuarioActionTypes): AuthUsuario => {

    switch (action.type) {
        case "AUTH_USUARIO":
            return action.data;

        case "LOGOUT_USUARIO":
            return AuthUsuarioReducerDefaultState;

        default:
            return state

    }

};

export { authUsuarioReducer }