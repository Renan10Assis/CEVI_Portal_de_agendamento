import { Viagem } from "../types/Viagem";
import { ViagemActionTypes } from "../types/actions";

const viagensReducerDefaultState: Viagem[] = [];

const viagensReducer = (state = viagensReducerDefaultState, action: ViagemActionTypes): Viagem[] => {

    switch (action.type) {
        case "SET_VIAGENS":
            return action.viagens;

        case "CREATE_VIAGEM":
            return [...state, action.data];

        case "UPDATE_MOT_VIAGEM":
            return state.map(viagem => {
                if (viagem.via_os === action.data.via_os) {
                    return {
                        ...viagem,
                        ...action.data
                    };
                } else {
                    return viagem;
                }

            });

        case "UPDATE_STATUS_VIAGEM":
            return state.map(viagem => {
                if (viagem.via_os === action.data.via_os) {
                    return {
                        ...viagem,
                        ...action.data
                    };
                } else {
                    return viagem;
                }

            });
            
        default:
            return state

    }

};

export { viagensReducer }