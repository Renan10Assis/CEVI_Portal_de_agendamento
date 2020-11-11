import { AuthUsuario } from "../types/AuthUsuario";
import { UsuarioActionTypes } from "../types/actions";

const dadosUser = localStorage.getItem('auth_user') || "";

const AuthUsuarioReducerDefaultState: AuthUsuario = dadosUser === "" ? {
    token: "",
    isLogged: false,
    user: {
        usu_id: "",
        usu_nome: "",
        usu_email: "",
        usu_tipo: "",
        usu_imagem: "",
        emp_id: "",
        emp_nomeFantasia: ""
    }
} : JSON.parse(dadosUser);

const authUsuarioReducer = (state = AuthUsuarioReducerDefaultState, action: UsuarioActionTypes): AuthUsuario => {

    switch (action.type) {
        case "AUTH_USUARIO":
            localStorage.setItem("auth_user", JSON.stringify(action.data));
            return action.data;

        case "LOGOUT_USUARIO":
           localStorage.removeItem("auth_user");

        default:
            return state

    }

};

export { authUsuarioReducer }