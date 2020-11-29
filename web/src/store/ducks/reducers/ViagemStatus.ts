import { ViagemStatus } from "../types/ViagemStatus";
import { ViagemStatusActionTypes } from "../types/actions";

const navigationReducerDefaultState: ViagemStatus = {
    concluido:"Concluído",
    aguardando: "Aguardando confirmação",
    cancelado:"Cancelado",
    pendente:"Pendente",
    atrasado:"Atrasado",
    em_analise:"Em análise",
    confirmado:"Confirmado",
    ativo:"Ativo",
    inativo:"Inativo",
    em_transito:"Em trânsito",
    disponivel:"Disponível"
};

const viagemStatusReducer = (state = navigationReducerDefaultState, action: ViagemStatusActionTypes): ViagemStatus => {

    switch (action.type) {
        case "SET_VIAGEM_STATUS":
            return action.data

        case "REMOVE_VIAGEM_STATUS":
            return state;
            
        default:
            return state

    }

};

export { viagemStatusReducer }