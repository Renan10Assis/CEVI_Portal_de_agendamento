import {Viagem} from "../types/Viagem";
import {AppActions} from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../..";


export const setViagens = (viagens: Viagem[]): AppActions =>({
    type: "SET_VIAGENS",
    viagens
});

export const createViagem = (data: Viagem): AppActions =>({
    type: "CREATE_VIAGEM",
    data
});

export const updateMotViagem = (data: Viagem): AppActions =>({
    type: "UPDATE_MOT_VIAGEM",
    data
});

export const updateStatusViagem = (data: Viagem): AppActions=>({
    type: "UPDATE_STATUS_VIAGEM",
    data
});



//----- thunk 
export const startSetViagens = (viagens: Viagem[]) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(setViagens(viagens));
    };

};


export const startCreateViagem = (viagemData: {
    via_os: string;
    via_mot_id: string;
    via_nomePassageiro: string;
    via_telPassageiro: string;
    via_end_origem: string;
    via_end_destino: string;
    via_dataHora_solicitacao: string;
    via_dataHora_embarque: string;
    via_observacao: string;
    via_status: string;
    solicitante: string;
    empresa_viagem: string;
    empresa_solicitante: string;
}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const {
            via_os = '',
            via_mot_id = '',
            via_nomePassageiro ='',
            via_telPassageiro = '',
            empresa_solicitante ='',
            empresa_viagem = '',
            solicitante = '',
            via_end_origem = '',
            via_end_destino = '',
            via_dataHora_solicitacao = '',
            via_dataHora_embarque = '',
            via_observacao = '',
            via_status = '',
        } = viagemData;
        const viagem = { via_os, solicitante,via_mot_id, via_nomePassageiro,via_telPassageiro, empresa_solicitante, empresa_viagem ,via_end_origem, via_end_destino, via_dataHora_solicitacao, via_dataHora_embarque, via_observacao, via_status};

        dispatch(
            createViagem({
                ...viagem
            })
        );
    };
};


export const startUpdateMotViagem = (data: Viagem) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(updateMotViagem(data));
    };
};

export const startUpdateStatusViagem = (data: Viagem) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(updateStatusViagem(data));
    };
};
