import React, { useEffect, useState, MouseEvent } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../store';
import ViagemGridData from '../../components/ViagemGridData';
import api from '../../services/api';
import { Viagem } from '../../store/ducks/types/Viagem';
import { startSetViagens } from '../../store/ducks/actions/Viagem';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { startLogoutUsuario } from '../../store/ducks/actions/AuthUsuario';
import PainelDireito from '../../components/PainelDireito';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { Motorista } from '../../store/ducks/types/Motorista';
import { startSetMotoristas } from '../../store/ducks/actions/Motorista';
import ViagemGridEdit from '../../components/ViagemGridEdit';
import SearchBlock from '../../components/SearchBlock';
import EstatViagemBlock from '../../components/EstatViagemBlock';
import RelatorioBlock from '../../components/RelatorioBlock';
import UsuarioGridCreate from '../../components/UsuarioGridCreate';



const Main = () => {

    const viagensState = useSelector((state: AppState) => state.viagens);
    const navegacaoState = useSelector((state: AppState) => state.navigation);
    const [viagensList, setViagensList] = useState<Viagem[]>([]);
    const [motoristasList, setMotoristasList] = useState<Motorista[]>([]);

    const dispatch = useDispatch();


    useEffect(() => {
        api.get('/viagens').then(res => {
            setViagensList(res.data);
            dispatch(startSetViagens(viagensList));
        }).catch(err => console.log(err));

    }, [viagensList]);

    useEffect(() => {
        api.get('/motoristas').then(res => {
            setMotoristasList(res.data);
            dispatch(startSetMotoristas(motoristasList));
        }).catch(err => console.log(err));

    }, [viagensList]);



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
                            <SearchBlock />
                            <span className="divisoriaMain"></span>
                            <EstatViagemBlock />
                            <span className="divisoriaMain"></span>
                            <RelatorioBlock />
                            <span className="divisoriaMain"></span>
                            <UsuarioGridCreate/>
                        </div>


                        <div id="labels-grid-viagem">
                            <span className={"rotulo-via-lbl"}>Lista de Viagens</span>

                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "os-lbl-grid"}>OS</span>
                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "dtSol-lbl-grid"}>Solicitado em</span>
                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "solic-lbl-grid"}>Solicitante</span>
                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "pass-lbl-grid"}>Passageiro</span>
                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "telPass-lbl-grid"}>Tel. Passageiro</span>
                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "emp-lbl-grid"}>Empresa</span>
                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "dtEmb-lbl-grid"}>Embarcar em</span>
                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "mot-lbl-grid"}>Motorista</span>
                            <span className={navegacaoState.viagemOSClicked ? "labels-grid-hidden" : "status-lbl-grid"}>Status</span>

                        </div>

                        <ViagemGridEdit />
                        <div id="lista-viagens">
                            {viagensState.map(viagem => {
                                if ((viagem.via_nomePassageiro.toLowerCase().includes(navegacaoState.searchTxt.toLowerCase()) || viagem.empresa_viagem.toLowerCase().includes(navegacaoState.searchTxt.toLowerCase()) || String(viagem.via_os).includes(navegacaoState.searchTxt)) && viagem.via_status.includes(navegacaoState.searchStatus)) {
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

                    <PainelDireito />
                </div>

                <Footer />

            </div>
        </div>

    );

}

export default Main;


