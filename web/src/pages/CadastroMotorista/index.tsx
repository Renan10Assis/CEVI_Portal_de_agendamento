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
import SearchBlockMot from '../../components/SearchBlockMot';
import { startSetMotoristas } from '../../store/ducks/actions/Motorista';
import { Motorista } from '../../store/ducks/types/Motorista';
import MotoristaGridData from '../../components/MotoristaGridData';
import MotoristaGridEdit from '../../components/MotoristaGridEdit';



const CadastroMotorista = () => {

    const motoristaState = useSelector((state: AppState) => state.motoristas);
    const navegacaoState = useSelector((state: AppState) => state.navigation);
    const [motoristaList, setMotoristaList] = useState<Motorista[]>([]);
    const dispatch = useDispatch();


    
    useEffect(() => {
        api.get('/motoristas').then(res => {
            setMotoristaList(res.data);
            dispatch(startSetMotoristas(motoristaList));
        }).catch(err => console.log(err));

    }, [motoristaState]);





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
                            <SearchBlockMot/>
                        </div>

                        <div id="labels-grid-motorista">
                            <span className={"rotulo-m-lbl"}>Lista de Motoristas</span>
                            <span className={"rotulo-m-nome"}>Nome</span>
                            <span className={"rotulo-m-tel"}>Telefone</span>
                            <span className={"rotulo-m-marca"}>Marca</span>
                            <span className={"rotulo-m-modelo"}>Modelo</span>
                            <span className={"rotulo-m-cor"}>Cor</span>
                            <span className={"rotulo-m-placa"}>Placa</span>
                            <span className={"rotulo-m-viat"}>Num.Viatura</span>
                            <span className={"rotulo-m-status"}>Status</span>
                            
                        </div>
                        <MotoristaGridEdit/>
                        <div id="lista-motoristas">
                            {motoristaState.map(motorista => {
                                if (motorista.mot_nome.toLowerCase().includes(navegacaoState.searchMotTxt.toLowerCase()) && motorista.mot_status.includes(navegacaoState.searchUserStatus)) {
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

                    <PainelDireito />
                </div>

                <Footer />

            </div>
        </div>

    );

}

export default CadastroMotorista;


