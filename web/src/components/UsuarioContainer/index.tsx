import React, { MouseEvent } from "react";
import { AppState } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import profile_image from "../../assets/profile_image.jpg";
import { Navigation } from "../../store/ducks/types/Navigation";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";

export const UsuarioContainer = () => {
    
    const dispatch = useDispatch()
    const usuarioState = useSelector((state: AppState) => state.authUsuarios);


    function handleProfileClick(action: MouseEvent<HTMLImageElement>) {
        console.log("cliquei");
        
        let selectionState:Navigation={
            profileImageClicked: true,
            profileLogoutClicked:false,
            profilePreferencesClicked:false,
            profileMouseOver:false
        }
        
        dispatch(startSetNavigation(selectionState));

    }

    function handleImage() {
        return usuarioState.user.usu_imagem ? usuarioState.user.usu_imagem : profile_image;
    }

    return (
        <div id="usuario-container">
            <div id="user-info">
                <span className="label-user">{usuarioState.user.emp_nomeFantasia}</span><span className="label-user">-</span>
                <span className="label-user">{usuarioState.user.usu_nome}</span><span className="label-user"/>
                <span className="label-user">Bem vindo,</span>
            </div>

            <div id="profile-image">
                <img onClick={handleProfileClick} id="image-user" src={handleImage()} alt="foto_usuario" />
            </div>

        </div>
    );

}
