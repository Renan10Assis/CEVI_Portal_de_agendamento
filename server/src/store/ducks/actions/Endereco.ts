import { Endereco } from "../types/Endereco";
import { AppActions } from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../..";


export const setEnderecos = (enderecos: Endereco[]): AppActions => ({
    type: "SET_ENDERECOS",
    enderecos
});

export const createEndereco = (data: Endereco): AppActions => ({
    type: "CREATE_ENDERECO",
    data
});

export const deleteEndereco = (end_id: string): AppActions => ({
    type: "DELETE_ENDERECO",
    end_id
});



//----- thunk 
export const startSetEnderecos = (enderecos: Endereco[]) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(setEnderecos(enderecos));
    };

};


export const startCreateEndereco = (enderecoData: {
    end_id: string;
    end_cep: string;
    end_logradouro: string;
    end_numero: string;
    end_bairro: string;
    end_uf: string;
    end_cidade: string;
    end_longitude: number;
    end_latitude: number;
}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const {
            end_id = '',
            end_cep = '',
            end_logradouro = '',
            end_numero = '',
            end_bairro = '',
            end_uf = '',
            end_cidade = '',
            end_longitude = 0,
            end_latitude = 0
        } = enderecoData;
        const endereco = { end_id, end_cep, end_logradouro, end_numero, end_bairro, end_uf, end_cidade, end_longitude, end_latitude };

        dispatch(
            createEndereco({
                ...endereco
            })
        );
    };
};


export const startDeleteEndereco = (end_id: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(deleteEndereco(end_id));
    };
};
