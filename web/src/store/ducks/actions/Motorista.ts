import {Motorista} from "../types/Motorista";
import {AppActions} from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../..";


export const setMotoristas = (motoristas: Motorista[]):AppActions =>({
    type: "SET_MOTORISTAS",
    motoristas
});

export const createMotorista = (data: Motorista):AppActions=>({
    type: "CREATE_MOTORISTA",
    data
});

export const updateMotorista = (data:Motorista): AppActions =>({
    type: "UPDATE_MOTORISTA",
    data
});



//----- thunk 
export const startSetMotoristas = (motoristas: Motorista[]) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(setMotoristas(motoristas));
    };

};


export const startCreateMotorista = (motoristaData: {
    mot_id:string;
    mot_sexo:string;
    mot_nome:string;
    mot_cpf:string;
    mot_nascimento:string;
    mot_telefone:string;
    mot_placa: string;
    mot_marca: string;
    mot_modelo: string;
    mot_anoModelo: string;
    mot_numeroViatura:string;
    mot_cor:string;
    mot_status:string;
}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const {
            mot_id = "",
            mot_sexo= "",
            mot_nome= "",
            mot_cpf= "",
            mot_nascimento= "",
            mot_telefone= "",
            mot_placa= "",
            mot_marca= "",
            mot_modelo= "",
            mot_anoModelo= "",
            mot_numeroViatura= "",
            mot_cor= "",
            mot_status= ""
        } = motoristaData;
        const motorista = { mot_id, mot_sexo, mot_nome, mot_cpf, mot_nascimento, mot_telefone, mot_placa, mot_marca,mot_modelo, mot_anoModelo, mot_numeroViatura, mot_cor, mot_status};

        dispatch(
            createMotorista({
                ...motorista
            })
        );
    };
};


export const startUpdateMotorista = (data: Motorista) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(updateMotorista(data));
    };
};
