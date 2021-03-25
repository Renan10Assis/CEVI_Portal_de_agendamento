import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../store';
import api from '../../services/api';
import PainelDireito from '../../components/PainelDireito';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { Usuario } from '../../store/ducks/types/Usuario';
import { startSetUsuarios } from '../../store/ducks/actions/Usuario';
import UsuarioGridData from '../../components/UsuarioGridData';
import SearchBlockUser from '../../components/SearchBlockUser';
import { Empresa } from '../../store/ducks/types/Empresa';
import { startSetEmpresas } from '../../store/ducks/actions/Empresa';
import UsuarioGridEdit from '../../components/UsuarioGridEdit';
import SairConfirm from '../../components/SairConfirm';
import NovoUsuario from '../../components/NovoUsuario';
import EstatUsuarioBloco from '../../components/EstatUsuarioBloco';
import UsuarioGridCreate from '../../components/UsuarioGridCreate';



const CadastroUsuario = () => {

    const viagensState = useSelector((state: AppState) => state.viagens);
    const motoristasState = useSelector((state: AppState) => state.motoristas);
    const usuariosState = useSelector((state: AppState) => state.usuarios);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const [usuariosList, setUsuariosList] = useState<Usuario[]>([]);
    const [empresasList, setEmpresasList] = useState<Empresa[]>([]);
    const dispatch = useDispatch();


    useEffect(() => {
            api.get('/usuarios').then(res => {
                setUsuariosList(res.data);
                dispatch(startSetUsuarios(usuariosList));

            }).catch(err => console.log(err));

    },[usuariosList]);

    useEffect(() => {
            api.get('/empresas').then(res => {
                setEmpresasList(res.data);
                dispatch(startSetEmpresas(empresasList));

            }).catch(err => console.log(err));

    },[empresasList]);




    return (
        <div id="main-container">

            {navigationState.profileSairClicked ? <SairConfirm /> : null/*div que aparece ao clica em sair*/}
            {navigationState.usuarioIDClicked? <UsuarioGridEdit />:null}
            {navigationState.novoUsuClicked ? <UsuarioGridCreate /> : null}

            <div id={navigationState.profileSairClicked ? "div-enable" : "div-disable"}>
                <Header />
                <Menu />
                <div id="left-main-content">
                    <div id="search-block">
                        <SearchBlockUser />
                        <span className="divisoriaUsuario"></span>
                        <EstatUsuarioBloco/>
                        <span className="divisoriaUsuario"></span>
                        <NovoUsuario/>
                    </div>

                    <div id="labels-grid-usuario">
                        <span className={"lista-user-lbl"}>Lista de Usuários</span>

                    </div>
                    <div id="lista-usuarios">
                        {usuariosState.map(usuario => {
                            if (usuario.usu_nome.toLowerCase().includes(navigationState.searchUserTxt.toLowerCase()) && usuario.usu_status.includes(navigationState.searchUserStatus)) {
                                return <UsuarioGridData key={usuario.usu_id}
                                    usu_id={usuario.usu_id}
                                    usu_email={usuario.usu_email}
                                    usu_emp_id={usuario.usu_emp_id}
                                    usu_imagem={usuario.usu_imagem}
                                    usu_nome={usuario.usu_nome}
                                    usu_senha={usuario.usu_senha}
                                    usu_status={usuario.usu_status}
                                    usu_tipo={usuario.usu_tipo}
                                />
                            }
                        })
                        }
                    </div>
                </div>

                <PainelDireito viagens={viagensState} motoristas={motoristasState} />
                <Footer />

            </div>
        </div>

    );

}

export default CadastroUsuario;


