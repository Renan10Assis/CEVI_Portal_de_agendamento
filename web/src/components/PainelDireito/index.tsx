import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { Viagem } from "../../store/ducks/types/Viagem";
import "./styles.css";
import DataAtrasada from "../../util/DataAtrasada";
import DataDiferenca from "../../util/DataDiferenca";
import { Motorista } from "../../store/ducks/types/Motorista";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ViagemPainel from "../ViagemPainel";

interface PainelProps {
    viagens: Viagem[],
    motoristas: Motorista[]
}

const PainelDireito: React.FC<PainelProps> = (props) => {

    const listaStatus = useSelector((state: AppState) => state.viagemStatus);

    return (
        <div id="painel-container">
            <span className="title-painel-viagens">Viagens confirmadas em execução</span>
            <div id="bloco-em-transito">
                {props.viagens.map(viagem => {

                    if (viagem.via_status === listaStatus.confirmado && DataAtrasada(viagem.via_dataHora_embarque)) {

                        return (
                            <ViagemPainel key={viagem.via_os} viagem={viagem} motoristas={props.motoristas} />
                        )
                    }
                })
                }
            </div>

            <div className="painel-divisoria"></div>

            <span className="title-painel-viagens">Viagens confirmadas a realizar (próximas 2h)</span>
            <div id="bloco-proximas-viagens">

                {props.viagens.map(viagem => {

                    if (viagem.via_status === listaStatus.confirmado && DataDiferenca(viagem.via_dataHora_embarque)) {

                        return (
                            <ViagemPainel key={viagem.via_os} viagem={viagem} motoristas={props.motoristas} />
                        )
                    }
                })
                }
            </div>

        </div>
    );
}

export default PainelDireito;