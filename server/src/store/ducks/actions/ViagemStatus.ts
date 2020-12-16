import {ViagemStatus} from "../types/ViagemStatus";
import {AppActions} from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../..";


export const setViagemStatus = (data: ViagemStatus):AppActions =>({
    type: "SET_VIAGEM_STATUS",
    data
});

export const removeViagemStatus = ():AppActions=>({
    type: "REMOVE_VIAGEM_STATUS"
});





//----- thunk 
export const startSetViagemStatus = (viaStatus: ViagemStatus) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(setViagemStatus(viaStatus));
    };

};

export const startRemoveViagemStatus = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(removeViagemStatus());
    };

};

