import { Endereco } from "../types/Endereco";
import { EnderecoActionTypes } from "../types/actions";

const enderecosReducerDefaultState: Endereco[] = [];

const enderecosReducer = (state = enderecosReducerDefaultState, action: EnderecoActionTypes): Endereco[] => {

    switch (action.type) {
        case "SET_ENDERECOS":
            return action.enderecos;

        case "CREATE_ENDERECO":
            return [...state, action.data];

        case "DELETE_ENDERECO":
            return state.filter(({ end_id }) => end_id !== action.end_id);

        default:
            return state

    }

};

export { enderecosReducer }