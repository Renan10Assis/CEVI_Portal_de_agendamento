import {Navigation} from "../types/Navigation";
import {AppActions} from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../..";


export const setNavigation = (data: Navigation):AppActions =>({
    type: "SET_NAVIGATION",
    data
});

export const removeNavigation = ():AppActions=>({
    type: "REMOVE_NAVIGATION"
});





//----- thunk 
export const startSetNavigation = (navigation: Navigation) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(setNavigation(navigation));
    };

};

export const startRemoveNavigation = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(removeNavigation());
    };

};

