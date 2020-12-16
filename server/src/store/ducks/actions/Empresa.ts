import { Empresa } from "../types/Empresa";
import { AppActions } from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../..";


export const setEmpresas = (empresas: Empresa[]): AppActions => ({
    type: "SET_EMPRESAS",
    empresas
});

export const createEmpresa = (data: Empresa): AppActions => ({
    type: "CREATE_EMPRESA",
    data
});

export const updateEmpresa = (data: Empresa): AppActions => ({
    type: "UPDATE_EMPRESA",
    data
});



//----- thunk 
export const startSetEmpresas = (empresas: Empresa[]) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(setEmpresas(empresas));
    };

};


export const startCreateEmpresa = (empresaData: {
    emp_id: string;
    emp_nomeFantasia: string;
    emp_cnpj: string;
    emp_endereco: string;
}) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        const {
            emp_id = '',
            emp_nomeFantasia = '',
            emp_cnpj = '',
            emp_endereco = '',
        } = empresaData;
        const empresa = { emp_id, emp_nomeFantasia, emp_cnpj, emp_endereco };

        dispatch(
            createEmpresa({
                ...empresa
            })
        );
    };
};


export const startUpdateEmpresa = (data: Empresa) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(updateEmpresa(data));
    };
};





