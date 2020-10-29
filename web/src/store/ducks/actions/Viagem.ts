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
    via_os: number;
    via_usu_id: string;
    via_emp_id: string;
    via_mot_id: string;
    via_telPassageiro: string;
    via_end_origem: string;
    via_end_destino: string;
    via_dataHora_solicitacao: string;
    via_dataHora_embarque: string;
    via_observacao: string;
    via_status: string;
}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const {
            via_os = 0,
            via_usu_id = '',
            via_emp_id = '',
            via_mot_id = '',
            via_telPassageiro = '',
            via_end_origem = '',
            via_end_destino = '',
            via_dataHora_solicitacao = '',
            via_dataHora_embarque = '',
            via_observacao = '',
            via_status = '',
        } = viagemData;
        const viagem = { via_os, via_usu_id, via_emp_id, via_mot_id, via_telPassageiro, via_end_origem, via_end_destino, via_dataHora_solicitacao, via_dataHora_embarque, via_observacao, via_status};

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
