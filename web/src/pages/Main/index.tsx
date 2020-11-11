import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import { UserOptions } from "../../components/UserOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from '../../store';
import ViagemGridData from '../../components/ViagemGridData';
import api from '../../services/api';
import { Viagem } from '../../store/ducks/types/Viagem';
import { startSetViagens } from '../../store/ducks/actions/Viagem';



const Main = () => {

    const viagens = useSelector((state: AppState) => state.viagens);
    const navegacaoState = useSelector((state: AppState) => state.navigation);
    const [divClass, setDivClass] = useState<string>("options_hidden");
    const [viagensList, setViagensList] = useState<Viagem[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (navegacaoState.profileImageClicked) {
            console.log(navegacaoState);

            setDivClass("options_visible")
        } else {
            setDivClass("options_hidden")
        }

    });

    useEffect(() => {
        api.get('/viagens').then(res=>{
            setViagensList(res.data);
            dispatch(startSetViagens(viagensList));
        }).catch(err=>console.log(err));

    },[viagensList]);



    return (
        <div id="main-container">
            <header id="main-header">
                <Header />
                <div className={divClass}><UserOptions /></div>
            </header>

            <div id="menu-container">

            </div>

            <main id="main-main">
                <div>{viagens.map(viagem=>{
                    return <ViagemGridData
                    via_os={viagem.via_os}
                    via_dataHora_embarque={viagem.via_dataHora_embarque}
                    via_dataHora_solicitacao={viagem.via_dataHora_solicitacao}
                    via_emp_id={viagem.via_emp_id}
                    via_end_origem={viagem.via_end_origem}
                    via_end_destino={viagem.via_end_destino}
                    via_usu_id={viagem.via_usu_id}
                    via_mot_id={viagem.via_mot_id}
                    via_observacao={viagem.via_observacao}
                    via_status={viagem.via_status}
                    via_telPassageiro={viagem.via_telPassageiro}
                    />
                }) }</div>
            </main>

            <div id="painel-container">

            </div>

            <footer id="main-footer">

            </footer>



        </div>

    );

}

export default Main;


