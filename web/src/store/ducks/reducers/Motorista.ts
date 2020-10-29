import { Motorista } from "../types/Motorista";
import { MotoristaActionTypes } from "../types/actions";

const motoristasReducerDefaultState: Motorista[] = [];

const motoristasReducer = (state = motoristasReducerDefaultState, action: MotoristaActionTypes): Motorista[] => {

    switch (action.type) {
        case "SET_MOTORISTAS":
            return action.motoristas;

        case "CREATE_MOTORISTA":
            return [...state, action.data];

        case "UPDATE_MOTORISTA":
            return state.map(motorista => {
                if (motorista.mot_id === action.data.mot_id) {
                    return {
                        ...motorista,
                        ...action.data
                    };
                } else {
                    return motorista;
                }

            });
            

        default:
            return state

    }

};

export { motoristasReducer }