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
    empresaIDClicked: "",
    searchStatus:"",
    searchTxt: "",
    searchUserStatus:"",
    searchUserTxt: "",
    searchMotTxt:"",
    searchEmpTxt:"",
    searchMotStatus: "",
    gerarRelatorioClicked:false,
    solicitarViagemClicked: false,
    novoUsuClicked: false,
    cadastrarMotClicked: false,
    cancelarViagemIDClicked:"",
    concluirViagemIDClicked:"",
    viagemOrderBy:"",
    atualizarListaViagens:true,
    atualizarListaEmpresas:true,
    atualizarListaMotoristas:true,
    atualizarListaUsuarios:true
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