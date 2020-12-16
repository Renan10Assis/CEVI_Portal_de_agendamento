import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../store';
import api from '../../services/api';
import PainelDireito from '../../components/PainelDireito';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import EmpresaGridData from '../../components/EmpresaGridData';
import EmpresaGridEdit from '../../components/EmpresaGridEdit';
import { Empresa } from '../../store/ducks/types/Empresa';
import { startSetEmpresas } from '../../store/ducks/actions/Empresa';
import SearchBlockEmp from '../../components/SearchBlockEmp';
import SairConfirm from '../../components/SairConfirm';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';



const CadastroEmpresa = () => {

    const viagensState = useSelector((state: AppState) => state.viagens);
    const motoristasState = useSelector((state: AppState) => state.motoristas);
    const empresaState = useSelector((state: AppState) => state.empresas);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const [empresaList, setEmpresaList] = useState<Empresa[]>([]);
    const dispatch = useDispatch();



    useEffect(() => {
            api.get('/empresas').then(res => {
                setEmpresaList(res.data);
                dispatch(startSetEmpresas(empresaList));


            }).catch(err => console.log(err));
    },[empresaList]);


    return (
        <div id="main-container">

            {navigationState.profileSairClicked ? <SairConfirm /> : null/*div que aparece ao clica em sair*/}


            <div id={navigationState.profileSairClicked ? "div-enable" : "div-disable"}>
                <Header />
                <Menu />

                <div id="left-main-content">
                    <div id="search-emp-block">
                        <SearchBlockEmp />
                    </div>

                    <div id="labels-grid-empresa">
                        <span className={"rotulo-e-lbl"}>Lista de Motoristas</span>
                        <span className={navigationState.empresaIDClicked ? "rotulo-empresa-hidden" : "rotulo-e-nome"}>Nome Fantasia</span>
                        <span className={navigationState.empresaIDClicked ? "rotulo-empresa-hidden" : "rotulo-e-cnpj"}>CNPJ</span>
                        <span className={navigationState.empresaIDClicked ? "rotulo-empresa-hidden" : "rotulo-e-ender"}>Enderço</span>


                    </div>
                    <EmpresaGridEdit />
                    <div id="lista-empresas">
                        {empresaState.map(empresa => {
                            if (empresa.emp_nomeFantasia.toLowerCase().includes(navigationState.searchEmpTxt.toLowerCase()) || empresa.emp_cnpj.includes(navigationState.searchEmpTxt)) {
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

                <PainelDireito viagens={viagensState} motoristas={motoristasState} />
                <Footer />

            </div>
        </div>

    );

}

export default CadastroEmpresa;


