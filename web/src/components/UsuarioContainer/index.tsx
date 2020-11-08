import React, { MouseEvent } from "react";
import { AppState } from "../../store/index";
import { useSelector } from "react-redux";
import "./styles.css";
import profile_image from "../../assets/profile_image.jpg";
import {IsAuthenticated} from "../../IsAuthenticated";

export const UsuarioContainer = () => {

    const usuarioState = useSelector((state: AppState) => state.authUsuarios);
    const teste = IsAuthenticated();


    function handleProfileClick(action: MouseEvent<HTMLImageElement>) {
        console.log(teste);
        document.getElementById("profile-options")?.setAttribute("style", "visibility:visible");
        
    }


    return (
        <div id="container">
            <div id="user-info">
                <span className="label-user">{usuarioState.user.emp_nomeFantasia}</span>
                <span className="label-user">{usuarioState.user.usu_nome}<> - </></span>
                <span className="label-user">Bem vindo,<> </></span>
            </div>

            <div id="profile-image">
                <img onClick={handleProfileClick} id="image-user" src={usuarioState.user.usu_imagem} alt="foto_usuario"/>
            </div>

            <div id="profile-options">
                <ul id="user-opt">
                    <li className="opt">Preferências</li>
                    <li className="opt">Configurações</li>
                    <li className="opt">Sair</li>
                </ul>
            </div>

        </div>
    );

}
