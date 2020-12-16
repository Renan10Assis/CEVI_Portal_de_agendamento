import React, { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { AppState } from "../../store";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import { Motorista } from "../../store/ducks/types/Motorista";
import { Viagem } from "../../store/ducks/types/Viagem";
import "./styles.css";



const ConcluirViaConfirm = () => {

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
            if (String(via.via_os) === String(navigationState.concluirViagemIDClicked)) {
                setViagem(via);
            }
        })

    }, [navigationState.concluirViagemIDClicked]);

    useEffect(() => {

        motoristaState.map(mot => {
            if (viagem.via_mot_id === mot.mot_id) {
                setViaMotoristas(mot);
            }
        })

    }, [viagem]);

    function handleNo(action: MouseEvent<HTMLButtonElement>) {
        let newNavState = navigationState;
        newNavState.concluirViagemIDClicked = "";
        dispatch(startSetNavigation(newNavState));
    }


    function handleYes(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();

        const viaDados = {
            via_os: navigationState.concluirViagemIDClicked,
            via_status: listaStatus.concluido
        }

        console.log(viaDados);

        api.put('viagens/upd-status', (viaDados)).then(res => {
            if (res.data.success) {
                alert("Viagem concluída com sucesso!");
            } else {
                alert("Erro ao concluir viagem");
                console.log(res.data.erro);
            }
        }).catch(err => console.log(err));

        let newNavState = navigationState;
        newNavState.concluirViagemIDClicked = "";
        dispatch(startSetNavigation(newNavState));

    }


    return (

        <div id="confirm-container">
            <div className="confirm-box">
                <span className="lbl-confirm-question">Deseja concluir a viagem? <br/>
                (Esta operação não poderá ser revertida!)
                </span>

                <span className="lbl-confirm-rotulo">OS:</span>
                <span className="lbl-confirm-dados">{viagem.via_os}</span>

                <span className="lbl-confirm-rotulo">Data embarque:</span>
                <span className="lbl-confirm-dados">{viagem.via_dataHora_embarque}</span>

                <span className="lbl-confirm-rotulo">Empresa:</span>
                <span className="lbl-confirm-dados">{viagem.empresa_viagem}</span>

                <span className="lbl-confirm-rotulo">Passageiro:</span>
                <span className="lbl-confirm-dados">{viagem.via_nomePassageiro}</span>

                <span className="lbl-confirm-rotulo">Motorista:</span>
                <span className="lbl-confirm-dados">{viaMotorista?.mot_nome}</span>

                {authUserState.user.usu_tipo !== "Cliente" ?
                    <button className="btn-confirm-yes" onClick={handleYes}>SIM</button> : null}

                {authUserState.user.usu_tipo !== "Cliente" ?
                    <button className="btn-confirm-no" onClick={handleNo}>NÃO</button> : null
                }

            </div>
        </div>
    );
}

export default ConcluirViaConfirm;