import React, { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { Viagem } from "../../store/ducks/types/Viagem";
import "./styles.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import { Motorista } from "../../store/ducks/types/Motorista";

interface ViagemPainelProps {
    viagem: Viagem;
    motoristas: Motorista[];
}

const ViagemPainel: React.FC<ViagemPainelProps> = (props) => {

    const authUserState = useSelector((state: AppState) => state.authUsuarios);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const [viaMotorista, setViaMotorista] = useState<Motorista>({
        mot_anoModelo: "",
        mot_cor: "",
        mot_cpf: "",
        mot_id: "",
        mot_marca: "",
        mot_modelo: "",
        mot_nascimento: "",
        mot_nome: "",
        mot_numeroViatura: "",
        mot_placa: "",
        mot_sexo: "",
        mot_status: "",
        mot_telefone: ""

    });

    const dispatch = useDispatch();

    useEffect(() => {
        props.motoristas.map(mot => {
            if (mot.mot_id === props.viagem.via_mot_id) {
                setViaMotorista(mot);
            }
        });
    }, [props.viagem]);

    function handleCancelarClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.cancelarViagemIDClicked = action.currentTarget.name;
        dispatch(startSetNavigation(newNavState));

    }

    function handleConcluirClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.concluirViagemIDClicked = action.currentTarget.name;
        dispatch(startSetNavigation(newNavState));

    }




    return (
        <div className="viagem-quick-box">
            <div className="viagem-info">
                <div className="painel-lbl-inline">
                    <span className="lbl-quick-viagem">OS:</span>
                    <span className="lbl-quick-viagem-data">{props.viagem.via_os}</span>
                </div>

                <div className="painel-lbl-inline">
                    <span className="lbl-quick-viagem">Data embarque:</span>
                    <span className="lbl-quick-viagem-data">{props.viagem.via_dataHora_embarque}</span>
                </div>

                <div className="painel-lbl-inline">
                    <span className="lbl-quick-viagem">Passageiro:</span>
                    <span className="lbl-quick-viagem-data">{props.viagem.via_nomePassageiro}</span>
                </div>

                <div className="painel-lbl-inline">
                    <span className="lbl-quick-viagem">Empresa:</span>
                    <span className="lbl-quick-viagem-data">{props.viagem.empresa_viagem}</span>
                </div>

                <div className="painel-lbl-inline">
                    <span className="lbl-quick-viagem">Motorista:</span>
                    <span className="lbl-quick-viagem-data">{viaMotorista.mot_nome}</span>
                </div>


            </div>

            <div className="viagem-action-btn">
                {authUserState.user.usu_tipo !== "Cliente"? <button name={props.viagem.via_os} id="btn-cancelar-viagem" onClick={handleCancelarClick}>Cancelar</button>: null}
                {authUserState.user.usu_tipo !== "Cliente"? <button name={props.viagem.via_os} id="btn-concluir-viagem" onClick={handleConcluirClick}>Concluir</button>: null}
            </div>

        </div>
    )



}

export default ViagemPainel;