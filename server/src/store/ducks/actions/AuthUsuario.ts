import {AuthUsuario} from "../types/AuthUsuario";
import {AppActions} from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../..";


export const authUsuario = (data: AuthUsuario):AppActions =>({
    type: "AUTH_USUARIO",
    data
});

export const logoutUsuario = ():AppActions =>({
    type: "LOGOUT_USUARIO"

});


//--thunk
export const startAuthUsuario = (data: AuthUsuario) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(authUsuario(data));
    };
};

export const startLogoutUsuario = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(logoutUsuario());
    };
};
