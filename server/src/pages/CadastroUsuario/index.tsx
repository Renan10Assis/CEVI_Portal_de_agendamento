import React, { useEffect, useState, MouseEvent } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../store';
import api from '../../services/api';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { startLogoutUsuario } from '../../store/ducks/actions/AuthUsuario';
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



const CadastroUsuario = () => {

    const usuariosState = useSelector((state: AppState) => state.usuarios);
    const navegacaoState = useSelector((state: AppState) => state.navigation);
    const [usuariosList, setUsuariosList] = useState<Usuario[]>([]);
    const [empresasList, setEmpresasList] = useState<Empresa[]>([]);
    const dispatch = useDispatch();


    useEffect(() => {
        api.get('/usuarios').then(res => {
            setUsuariosList(res.data);
            dispatch(startSetUsuarios(usuariosList));
        }).catch(err => console.log(err));

    }, [usuariosState]);
    
    useEffect(() => {
        api.get('/empresas').then(res => {
            setEmpresasList(res.data);
            dispatch(startSetEmpresas(empresasList));
        }).catch(err => console.log(err));

    }, [empresasList]);





    function handleSairSim(action: MouseEvent<HTMLButtonElement>) {
        if (navegacaoState.profileSairClicked) {
            dispatch(startLogoutUsuario());
            document.location.assign("/");
        }
    }

    function handleSairNão(action: MouseEvent<HTMLButtonElement>) {
        if (navegacaoState.profileSairClicked) {
            let newNavState = navegacaoState;
            newNavState.profileSairClicked = false;
            dispatch(startSetNavigation(newNavState));
        }
    }

    return (
        <div id="main-container">

            {/*div que aparece ao clica em sair*/}
            <div id={navegacaoState.profileSairClicked ? "logout-visible" : "logout-hidden"}>
                <span className="logout-message">Deseja realmente sair?</span>
                <button className="btn-logout" onClick={handleSairSim}>Sim</button>
                <button className="btn-logout" onClick={handleSairNão}>Não</button>
            </div>

            <div id={navegacaoState.profileSairClicked ? "div-enable" : "div-disable"}>
                <div id="top-level">
                    <Header />
                    <Menu />
                </div>

                <div id="main_content">
                    <div id="left-main-content">
                        <div id="search-block">
                            <SearchBlockUser/>
                        </div>

                        <div id="labels-grid-usuario">
                            <span className={"lista-user-lbl"}>Lista de Usuários</span>
                            
                        </div>
                        <UsuarioGridEdit/>
                        <div id="lista-usuarios">
                            {usuariosState.map(usuario => {
                                if (usuario.usu_nome.toLowerCase().includes(navegacaoState.searchUserTxt.toLowerCase()) && usuario.usu_status.includes(navegacaoState.searchUserStatus)) {
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

                    <PainelDireito />
                </div>

                <Footer />

            </div>
        </div>

    );

}

export default CadastroUsuario;


