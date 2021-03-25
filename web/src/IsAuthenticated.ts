import api from "./services/api";
import { AuthUsuario } from "./store/ducks/types/AuthUsuario";
import { useDispatch } from "react-redux";
import { startLogoutUsuario } from "./store/ducks/actions/AuthUsuario";
import { useState } from "react";

export const IsAuthenticated = (): boolean => {
    const dadosUser = localStorage.getItem('auth_user') || "";
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const auth_user: AuthUsuario = dadosUser === "" ? {
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

    if (auth_user.token !== "") {
        api.post('/usuarios/auto-auth', auth_user).then(res => {
            if (res.data.isLogged) {
                setAuthenticated(res.data.isLogged);
            } else {
                dispatch(startLogoutUsuario());

            }
        }).catch(err => {
            console.log(err);
            dispatch(startLogoutUsuario());
        });
    }

    return authenticated;

}


