import api from "./services/api";
import { AuthUsuario } from "./store/ducks/types/AuthUsuario";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startLogoutUsuario } from "./store/ducks/actions/AuthUsuario";

export const IsAuthenticated = () => {
    const dadosUser = localStorage.getItem('auth_user') || "";
    const [auth, setAuth] = useState<boolean>(false);
    const dispatch = useDispatch();

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

            setAuth(res.data.isLogged);
            if (!res.data.isLogged) {
                dispatch(startLogoutUsuario());
            }
        }).catch(err => console.log(err));
    }
    
    

    return auth;

}


