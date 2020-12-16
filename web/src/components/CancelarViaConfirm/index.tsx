import React, { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { AppState } from "../../store";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import { Motorista } from "../../store/ducks/types/Motorista";
import { Viagem } from "../../store/ducks/types/Viagem";
import "./styles.css";



const CancelarViaConfirm = () => {

    const navigationState = useSelector((state: AppState) => state.navigation);
    const motoristaState = useSelector((state: AppState) => state.motoristas);
    const authUserState = useSelector((state: AppState) => state.authUsuarios);
    const viagensState = useSelector((state: AppState) => state.viagens);
    const listaStatus = useSelector((state: AppState) => state.viagemStatus);
    const dispatch = useDispatch();

    const [viaMotorista, setViaMotoristas] = useState<Motorista>();

    const [viagem, setViagem] = useState<Viagem>({
        via_dataHora_embarque: "",
        empresa_solicitante: "",
        empresa_viagem: "",
        solicitante: "",
        via_dataHora_solicitacao: "",
        via_end_destino: "",
        via_end_origem: "",
        via_mot_id: "",
        via_nomePassageiro: "",
        via_observacao: "",
        via_os: "",
        via_status: "",
        via_telPassageiro: ""
    })

    useEffect(() => {
            viagensState.map(via => {
                if(String(via.via_os) === String(navigationState.cancelarViagemIDClicked)){
                    setViagem(via)
                 }
            })
        
    },[navigationState.cancelarViagemIDClicked]);

    useEffect(()=>{

        motoristaState.map(mot=>{
            if(viagem.via_mot_id === mot.mot_id){
                setViaMotoristas(mot);
            }
        })
    },[viagem]);

    function handleNo(action: MouseEvent<HTMLButtonElement>) {
        let newNavState = navigationState;
        newNavState.cancelarViagemIDClicked = "";
        dispatch(startSetNavigation(newNavState));
    }


    function handleYes(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();

        const viaDados = {
            via_os: navigationState.cancelarViagemIDClicked,
            via_status: listaStatus.cancelado
        }


        api.put('viagens/upd-status', (viaDados)).then(res => {
            if (res.data.success) {
                alert("Viagem cancelada com sucesso!");
            } else {
                alert("Erro ao cancelar viagem");
                console.log(res.data.erro);
            }
        }).catch(err => console.log(err));

        let newNavState = navigationState;
        newNavState.cancelarViagemIDClicked = "";
        dispatch(startSetNavigation(newNavState));

    }


    return (

        <div id="cancel-container">
            <div className="cancel-box">
                <span className="lbl-cancel-question">Deseja cancelar a viagem? <br/>
                (Esta operação não poderá ser revertida!)
                </span>

                <span className="lbl-cancel-rotulo">OS:</span>
                <span className="lbl-cancel-dados">{viagem.via_os}</span>

                <span className="lbl-cancel-rotulo">Data embarque:</span>
                <span className="lbl-cancel-dados">{viagem.via_dataHora_embarque}</span>

                <span className="lbl-cancel-rotulo">Empresa:</span>
                <span className="lbl-cancel-dados">{viagem.empresa_viagem}</span>

                <span className="lbl-cancel-rotulo">Passageiro:</span>
                <span className="lbl-cancel-dados">{viagem.via_nomePassageiro}</span>

                <span className="lbl-cancel-rotulo">Motorista:</span>
                <span className="lbl-cancel-dados">{viaMotorista?.mot_nome}</span>

                {authUserState.user.usu_tipo !== "Cliente" ?
                    <button className="btn-confirm-yes" onClick={handleYes}>SIM</button> : null}

                {authUserState.user.usu_tipo !== "Cliente" ?
                    <button className="btn-confirm-no" onClick={handleNo}>NÃO</button> : null
                }

            </div>
        </div>
    );
}

export default CancelarViaConfirm;