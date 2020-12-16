import { Usuario } from "../types/Usuario";
import { UsuarioActionTypes } from "../types/actions";

const usuariosReducerDefaultState: Usuario[] = [];

const usuariosReducer = (state = usuariosReducerDefaultState, action: UsuarioActionTypes): Usuario[] => {

    switch (action.type) {
        case "SET_USUARIOS":
            return action.usuarios;

        case "CREATE_USUARIO":
            return [...state, action.data];

        case "DELETE_USUARIO":
            return state.filter(({ usu_id }) => usu_id !== action.usu_id);


        case "UPDATE_USUARIO":
            return state.map(usuario => {
                if (usuario.usu_id === action.data.usu_id) {
                    return {
                        ...usuario,
                        ...action.data
                    };
                } else {
                    return usuario;
                }

            });

        case "UPDATE_EMAIL_USUARIO":
            return state.map(usuario => {
                if (usuario.usu_id === action.data.usu_id) {
                    return {
                        ...usuario,
                        ...action.data
                    };
                } else {
                    return usuario;
                }

            });

        case "UPDATE_IMAGE_USUARIO":
            return state.map(usuario => {
                if (usuario.usu_id === action.data.usu_id) {
                    return {
                        ...usuario,
                        ...action.data
                    };
                } else {
                    return usuario;
                }

            });

        case "UPDATE_SENHA_USUARIO":
            return state.map(usuario => {
                if (usuario.usu_id === action.data.usu_id) {
                    return {
                        ...usuario,
                        ...action.data
                    };
                } else {
                    return usuario;
                }

            });



        default:
            return state

    }

};

export { usuariosReducer }