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
import EmpresaGridData from '../../components/EmpresaGridData';
import EmpresaGridEdit from '../../components/EmpresaGridEdit';
import { Empresa } from '../../store/ducks/types/Empresa';
import { startSetEmpresas } from '../../store/ducks/actions/Empresa';
import SearchBlockEmp from '../../components/SearchBlockEmp';



const CadastroEmpresa = () => {

    const empresaState = useSelector((state: AppState) => state.empresas);
    const navegacaoState = useSelector((state: AppState) => state.navigation);
    const [empresaList, setEmpresaList] = useState<Empresa[]>([]);
    const dispatch = useDispatch();


    
    useEffect(() => {
        api.get('/empresas').then(res => {
            setEmpresaList(res.data);
            dispatch(startSetEmpresas(empresaList));
        }).catch(err => console.log(err));

    }, [empresaState]);





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
                        <div id="search-emp-block">
                            <SearchBlockEmp/>
                        </div>

                        <div id="labels-grid-empresa">
                            <span className={"rotulo-e-lbl"}>Lista de Motoristas</span>
                            <span className={"rotulo-e-nome"}>Nome Fantasia</span>
                            <span className={"rotulo-e-cnpj"}>CNPJ</span>
                            <span className={"rotulo-e-ender"}>Enderço</span>
                            
                            
                        </div>
                        <EmpresaGridEdit/>
                        <div id="lista-empresas">
                            {empresaState.map(empresa => {
                                if (empresa.emp_nomeFantasia.toLowerCase().includes(navegacaoState.searchEmpTxt.toLowerCase()) && empresa.emp_cnpj.includes(navegacaoState.searchEmpTxt)) {
                                    return <EmpresaGridData key={empresa.emp_id}
                                        emp_id={empresa.emp_id}
                                        emp_cnpj={empresa.emp_cnpj}
                                        emp_nomeFantasia={empresa.emp_nomeFantasia}
                                        emp_endereco={empresa.emp_endereco}
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

export default CadastroEmpresa;


