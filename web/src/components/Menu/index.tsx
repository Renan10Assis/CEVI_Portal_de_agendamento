import React, { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import "./styles.css";


const Menu = () => {
    const navigationState = useSelector((state: AppState) => state.navigation);
    const authUserState = useSelector((state: AppState) => state.authUsuarios);
    const dispatch = useDispatch();

    function handleCadastroClick(action: MouseEvent<HTMLLIElement>) {

        let newNavState = navigationState;
        newNavState.menuCadastroClicked = true;
        dispatch(startSetNavigation(newNavState));

    }

    function handleCadastroMouseLeave(action: MouseEvent<HTMLDivElement>) {

        let newNavState = navigationState;
        newNavState.menuCadastroClicked = false;
        dispatch(startSetNavigation(newNavState));

    }


    return (
        <div id="menu-container">
            <div id="menu">
                <Link to="/main"><span className="menu-sintetico"><p className="txt">Agendamentos</p></span></Link>
                {authUserState.user.usu_tipo.toLowerCase() === "administrador"?
                       <span className={!navigationState.menuCadastroClicked?"menu-sint-cad":"menu-sint-cad-selected"} onClick={handleCadastroClick}><p className="txt">Cadastros</p></span>:null

                }


            </div>

            <div className={navigationState.menuCadastroClicked ? "cadastro-options-visible" : "cadastro-options-hidden"} onMouseLeave={handleCadastroMouseLeave}>
                <Link className="sub-menu" to="/cadastros-empresas">
                    <span className="menu-analitico"><p className="txt">Empresas</p></span>
                </Link>

                <Link className="sub-menu" to="/cadastros-motoristas">
                    <span className="menu-analitico"><p className="txt">Motorista</p></span>
                </Link>

                <Link className="sub-menu-last" to="/cadastros-usuarios">
                    <span className="menu-analitico"><p className="txt">Usuários</p></span>
                </Link>

            </div>
        </div>

    );

}

export default Menu;