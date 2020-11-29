import { Navigation } from "../types/Navigation";
import { NavigationActionTypes } from "../types/actions";

const navigationReducerDefaultState: Navigation = {
    profileImageClicked:false,
    profileImageHover:false,
    profileSairClicked: false,
    profilePrefClicked:false,
    profileBlockMouseOver:false,
    menuCadastroClicked:false,
    menuCadastroHover:false,
    viagemOSClicked: "",
    usuarioIDClicked:"",
    motoristaIDClicked:"",
    searchStatus:"",
    searchTxt: "",
    searchUserStatus:"",
    searchUserTxt: "",
    searchMotTxt:"",
    searchMotStatus: "",
    gerarRelatorioClicked:false,
    solicitarViagemClicked: false
};

const navigationReducer = (state = navigationReducerDefaultState, action: NavigationActionTypes): Navigation => {

    switch (action.type) {
        case "SET_NAVIGATION":
            return action.data

        case "REMOVE_NAVIGATION":
            return state;
            
        default:
            return state

    }

};

export { navigationReducer }