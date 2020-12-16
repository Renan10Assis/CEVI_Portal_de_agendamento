import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../store';
import api from '../../services/api';
import PainelDireito from '../../components/PainelDireito';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import SearchBlockMot from '../../components/SearchBlockMot';
import { startSetMotoristas } from '../../store/ducks/actions/Motorista';
import { Motorista } from '../../store/ducks/types/Motorista';
import MotoristaGridData from '../../components/MotoristaGridData';
import MotoristaGridEdit from '../../components/MotoristaGridEdit';
import MotoristaGridCreate from '../../components/MotoristaGridCreate';
import SairConfirm from '../../components/SairConfirm';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';



const CadastroMotorista = () => {

    const viagensState = useSelector((state: AppState) => state.viagens);
    const motoristaState = useSelector((state: AppState) => state.motoristas);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const [motoristaList, setMotoristaList] = useState<Motorista[]>([]);
    const dispatch = useDispatch();



    useEffect(() => {
            api.get('/motoristas').then(res => {
                setMotoristaList(res.data);
                dispatch(startSetMotoristas(motoristaList));

            }).catch(err => console.log(err));

    },[motoristaList]);


    return (
        <div id="main-container">

            {navigationState.profileSairClicked ? <SairConfirm /> : null/*div que aparece ao clica em sair*/}


            <div id={navigationState.profileSairClicked ? "div-enable" : "div-disable"}>
                <Header />
                <Menu />

                <div id="left-main-content">
                    <div id="search-block">
                        <SearchBlockMot />
                        <MotoristaGridCreate />
                    </div>

                    <div id="labels-grid-motorista">
                        <span className="rotulo-m-lbl">Lista de Motoristas</span>
                        <span className={navigationState.motoristaIDClicked ? "rotulo-motorista-hidden" : "rotulo-m-nome"}>Nome</span>
                        <span className={navigationState.motoristaIDClicked ? "rotulo-motorista-hidden" : "rotulo-m-tel"}>Telefone</span>
                        <span className={navigationState.motoristaIDClicked ? "rotulo-motorista-hidden" : "rotulo-m-marca"}>Marca</span>
                        <span className={navigationState.motoristaIDClicked ? "rotulo-motorista-hidden" : "rotulo-m-modelo"}>Modelo</span>
                        <span className={navigationState.motoristaIDClicked ? "rotulo-motorista-hidden" : "rotulo-m-cor"}>Cor</span>
                        <span className={navigationState.motoristaIDClicked ? "rotulo-motorista-hidden" : "rotulo-m-placa"}>Placa</span>
                        <span className={navigationState.motoristaIDClicked ? "rotulo-motorista-hidden" : "rotulo-m-viat"}>Num.Viatura</span>
                        <span className={navigationState.motoristaIDClicked ? "rotulo-motorista-hidden" : "rotulo-m-status"}>Status</span>

                    </div>
                    <MotoristaGridEdit />
                    <div id="lista-motoristas">
                        {motoristaState.map(motorista => {
                            if (motorista.mot_nome.toLowerCase().includes(navigationState.searchMotTxt.toLowerCase()) && motorista.mot_status.includes(navigationState.searchUserStatus)) {
                                return <MotoristaGridData key={motorista.mot_id}
                                    mot_id={motorista.mot_id}
                                    mot_nome={motorista.mot_nome}
                                    mot_sexo={motorista.mot_sexo}
                                    mot_cpf={motorista.mot_cpf}
                                    mot_telefone={motorista.mot_telefone}
                                    mot_nascimento={motorista.mot_nascimento}
                                    mot_marca={motorista.mot_marca}
                                    mot_modelo={motorista.mot_modelo}
                                    mot_cor={motorista.mot_cor}
                                    mot_anoModelo={motorista.mot_anoModelo}
                                    mot_placa={motorista.mot_placa}
                                    mot_numeroViatura={motorista.mot_numeroViatura}
                                    mot_status={motorista.mot_status}

                                />
                            }
                        })
                        }
                    </div>
                </div>

                <PainelDireito viagens={viagensState} motoristas={motoristaState} />
                <Footer />

            </div>
        </div>

    );

}

export default CadastroMotorista;


