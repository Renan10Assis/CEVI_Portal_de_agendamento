import React from 'react';
import { AppState } from '../../store/index';
import { useSelector } from 'react-redux';
import './styles.css';

interface ViagemProps {
    via_os: number;
    via_usu_id: string;
    via_emp_id: string;
    via_telPassageiro: string;
    via_end_origem: string;
    via_end_destino: string;
    via_dataHora_solicitacao: string;
    via_dataHora_embarque: string;
    via_observacao: string;
    via_mot_id: string;
    via_status: string;


}


const ViagemGridData: React.FC<ViagemProps> = (props) => {


    return (
        <div className="viagem-data">

            <form key={props.via_os}>

                <span className="viagem-span">{props.via_os}</span>
                <span className="viagem-span">{props.via_usu_id}</span>
                <span className="viagem-span">{props.via_emp_id}</span>
                <span className="viagem-span">{props.via_telPassageiro}</span>
                <span className="viagem-span">{props.via_end_origem}</span>
                <span className="viagem-span">{props.via_end_destino}</span>
                <span className="viagem-span">{props.via_dataHora_solicitacao}</span>
                <span className="viagem-span">{props.via_dataHora_embarque}</span>
                <span className="viagem-span">{props.via_observacao}</span>
                <span className="viagem-span">{props.via_mot_id}</span>
                <span className="viagem-span">{props.via_status}</span>
                <button className="btn-edit-viagem">Editar</button>
            </form>
        </div>
    );

}

export default ViagemGridData;
