import { Empresa } from "../types/Empresa";
import { EmpresaActionTypes } from "../types/actions";

const empresasReducerDefaultState: Empresa[] = [];

const empresasReducer = (state = empresasReducerDefaultState, action: EmpresaActionTypes): Empresa[] => {

    switch (action.type) {
        case "SET_EMPRESAS":
            return action.empresas;

        case "CREATE_EMPRESA":
            return [...state, action.data];

        case "UPDATE_EMPRESA":
            return state.map(empresa => {
                if (empresa.emp_id === action.data.emp_id) {
                    return {
                        ...empresa,
                        ...action.data
                    };
                } else {
                    return empresa;
                }

            });
        
        default:
            return state

    }

};

export { empresasReducer }