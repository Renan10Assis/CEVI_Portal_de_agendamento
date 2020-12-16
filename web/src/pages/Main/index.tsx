import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../store';
import ViagemGridData from '../../components/ViagemGridData';
import api from '../../services/api';
import { Viagem } from '../../store/ducks/types/Viagem';
import { startSetViagens } from '../../store/ducks/actions/Viagem';
import PainelDireito from '../../components/PainelDireito';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { Motorista } from '../../store/ducks/types/Motorista';
import { startSetMotoristas } from '../../store/ducks/actions/Motorista';
import ViagemGridEdit from '../../components/ViagemGridEdit';
import SearchBlock from '../../components/SearchBlock';
import EstatViagemBlock from '../../components/EstatViagemBlock';
import RelatorioBlock from '../../components/RelatorioBlock';
import ViagemGridCreate from '../../components/ViagemGridCreate';
import { startSetEmpresas } from '../../store/ducks/actions/Empresa';
import { Empresa } from '../../store/ducks/types/Empresa';
import CancelarViaConfirm from '../../components/CancelarViaConfirm';
import SairConfirm from '../../components/SairConfirm';
import ConcluirViaConfirm from '../../components/ConcluirViaConfirm';
import SolicitarViagem from '../../components/SolicitarViagem';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';



const Main = () => {

    const authUserState = useSelector((state: AppState) => state.authUsuarios);
    const viagensState = useSelector((state: AppState) => state.viagens);
    const motoristasState = useSelector((state: AppState) => state.motoristas);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const [viagensList, setViagensList] = useState<Viagem[]>([]);
    const [motoristasList, setMotoristasList] = useState<Motorista[]>([]);
    const [empresasList, setEmpresasList] = useState<Empresa[]>([]);

    const dispatch = useDispatch();


    useEffect(() => {
        if (navigationState.atualizarListaViagens) {

            if (authUserState.user.usu_tipo === "Cliente") {

                api.post(`/viagens/list/${authUserState.user.emp_id}`).then(res => {
                    setViagensList(res.data);
                    dispatch(startSetViagens(viagensList));

                }).catch(err => console.log(err));

            } else {

                api.post('/viagens/list', ({ orderBy: navigationState.viagemOrderBy })).then(res => {
                    setViagensList(res.data);
                    dispatch(startSetViagens(viagensList));

                }).catch(err => console.log(err));
            }


        }

    },[viagensList]);

    useEffect(() => {

        if (navigationState.atualizarListaMotoristas) {

            api.get('/motoristas').then(res => {
                setMotoristasList(res.data);
                dispatch(startSetMotoristas(motoristasList));

            }).catch(err => console.log(err));


        }
    },[motoristasList]);

    useEffect(() => {
            api.get('/empresas').then(res => {
                setEmpresasList(res.data);
                dispatch(startSetEmpresas(empresasList));

            }).catch(err => console.log(err));


        
    },[empresasList]);




    return (
        <div id="main-container">


            {navigationState.concluirViagemIDClicked ? <ConcluirViaConfirm /> : null}
            {navigationState.cancelarViagemIDClicked ? <CancelarViaConfirm /> : null}
            {navigationState.solicitarViagemClicked ? <ViagemGridCreate /> : null}
            {navigationState.viagemOSClicked ? <ViagemGridEdit /> : null}
            {navigationState.profileSairClicked ? <SairConfirm /> : null/*div que aparece ao clica em sair*/}

            <div id={navigationState.profileSairClicked ? "div-enable" : "div-disable"}>
                <Header />
                <Menu />

                <div id="left-main-content">
                    <div id="search-block">
                        <SearchBlock />
                        <span className="divisoriaMain"></span>
                        <EstatViagemBlock />
                        <span className="divisoriaMain"></span>
                        <RelatorioBlock />
                        <span className="divisoriaMain"></span>
                        <SolicitarViagem />
                    </div>


                    <div id="labels-grid-viagem">
                        <span className={"rotulo-via-lbl"}>Lista de Viagens</span>

                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "os-lbl-grid"}>OS</span>
                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "dtSol-lbl-grid"}>Solicitado em</span>
                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "solic-lbl-grid"}>Solicitante</span>
                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "pass-lbl-grid"}>Passageiro</span>
                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "telPass-lbl-grid"}>Tel. Passageiro</span>
                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "emp-lbl-grid"}>Empresa</span>
                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "dtEmb-lbl-grid"}>Embarcar em</span>
                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "mot-lbl-grid"}>Motorista</span>
                        <span className={navigationState.viagemOSClicked ? "labels-grid-hidden" : "status-lbl-grid"}>Status</span>

                    </div>


                    <div id="lista-viagens">
                        {viagensState.map(viagem => {
                            if ((viagem.via_nomePassageiro.toLowerCase().includes(navigationState.searchTxt.toLowerCase()) || viagem.empresa_viagem.toLowerCase().includes(navigationState.searchTxt.toLowerCase()) || String(viagem.via_os).includes(navigationState.searchTxt)) && viagem.via_status.includes(navigationState.searchStatus)) {
                                return <ViagemGridData key={viagem.via_os}
                                    via_os={viagem.via_os}
                                    via_dataHora_embarque={viagem.via_dataHora_embarque}
                                    via_dataHora_solicitacao={viagem.via_dataHora_solicitacao}
                                    empresa_viagem={viagem.empresa_viagem}
                                    via_end_origem={viagem.via_end_origem}
                                    via_end_destino={viagem.via_end_destino}
                                    solicitante={viagem.solicitante}
                                    empresa_solicitante={viagem.empresa_solicitante}
                                    via_mot_id={viagem.via_mot_id}
                                    via_observacao={viagem.via_observacao}
                                    via_status={viagem.via_status}
                                    via_telPassageiro={viagem.via_telPassageiro}
                                    via_nomePassageiro={viagem.via_nomePassageiro}
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

export default Main;


