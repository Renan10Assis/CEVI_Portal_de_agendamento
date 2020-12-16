import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import './styles.css';



const Footer = () => {

    const authUserState = useSelector((state: AppState) => state.authUsuarios);

    return (
        <div id="rodape">

            <div id={authUserState.user.usu_tipo ==="Administrador"?"side":"side-hidden"}>
                <h3 className="sup-txt">Suporte</h3>
                <h5 className="txt-first">Renan Moreira Lima de Assis</h5>
                <h5 className="txt-contato">(11) 97319-9421</h5>
                <h5 className="txt-contato">E-mail: renan10assis@gmail.com</h5>
                <h5 className="txt-first">Jõao Vitor dos Santos Magalhães</h5>
                <h5 className="txt-contato">(15) 99696-2742</h5>
                <h5 className="txt-contato">E-mail: joaovit-01@hotmail.com</h5>
            </div>


            <div id="middle">
                <h3 className="cevi-txt">CEVI</h3>
                <h5 className="txt-slogan">Central de Viagens</h5>
                <a href="http://www.ceviapp.com.br" target="_blank" rel="noopener noreferrer" className="txt-link">ceviapp.com.br</a>
                <h5 className="txt-last">cpa_2020.1.00.01  Todos os direitos reservados a TechSmart - Serviços e Soluções Tecnológicos</h5>

            </div>
            <div id="side">

            </div>

        </div>
    );

}

export default Footer;