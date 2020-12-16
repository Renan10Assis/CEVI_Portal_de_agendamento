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
    const navigationState = useSelector((state: AppState) => state.navigation);


    function handleProfileClick(action: MouseEvent<HTMLImageElement>) {

        let newNavState: Navigation = navigationState;
        newNavState.profileImageClicked = true;

        dispatch(startSetNavigation(newNavState));

    }


    function handleImage() {
        return usuarioState.user.usu_imagem ? usuarioState.user.usu_imagem : profile_image;
    }

    function handleSair(action:MouseEvent<HTMLLIElement>){
        let newNavState = navigationState;
        newNavState.profileSairClicked = true;
        dispatch(startSetNavigation(newNavState));
    }


    function handleProfileBlockLeave(action: MouseEvent<HTMLDivElement>) {
        let newNavState: Navigation = navigationState;
        newNavState.profileImageClicked = false;
        dispatch(startSetNavigation(newNavState));
    }



    return (
        <div id="usuario-container">
            <div id="user-info">
                <span className="label-user">{usuarioState.user.emp_nomeFantasia}</span><span className="label-user">-</span>
                <span className="label-user">{usuarioState.user.usu_nome}</span><span className="label-user" />
                <span className="label-user">Bem vindo,</span>
            </div>

            <div id="profile-image">
                <img onClick={handleProfileClick} id="image-user" src={handleImage()} alt="foto_usuario" />
            </div>
            <div className={navigationState.profileImageClicked ? "options_visible" : "options_hidden"} onMouseLeave={handleProfileBlockLeave}>
                <ul className="ul-options">
                    <li className="li-option">Preferências</li>
                    <li className="li-option" onClick={handleSair}>Sair</li>
                </ul>
            </div>
        </div>
    );

}
