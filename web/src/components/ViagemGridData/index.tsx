import React from 'react';
import { AppState } from '../../store/index';
import { useSelector } from 'react-redux';

interface ViagemProps {
    via_os: number;
    via_usu_nome: string;
    via_emp_nome: string;
    via_telPassageiro: string;
    via_end_origem: string;
    via_end_destino: string;
    via_dataHora_solicitacao: string;
    via_dataHora_embarque: string;
    via_observacao: string;
    via_mot_nome: string;
    via_status: string;

}


const ViagemGridData = () => {


    return (
        <div>
            <label>{}</label>
            <input type="text" />
        </div>
    );

}

export default ViagemGridData;
