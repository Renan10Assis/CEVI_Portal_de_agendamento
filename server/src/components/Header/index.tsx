import React from 'react';
import './styles.css';
import {UsuarioContainer} from "../UsuarioContainer";

const Header = () => {

    return (
        <div id="header-container">
            <div id="logo-div">
                <h1 id="logo-lbl2">CEVI</h1>
                <h2 id="slogan-lbl2">Portal de Agendamento</h2>
            </div>

            <div id="user-div">
                <UsuarioContainer/>
            </div>

        </div>
    );

}

export default Header;