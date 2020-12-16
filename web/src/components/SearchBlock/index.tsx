import React, {ChangeEvent, MouseEvent, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import { AppState } from "../../store/index";
import "./styles.css";


const SearchBlock = () => {
    const navigationState = useSelector((state:AppState)=>state.navigation);
    const statusOptions = useSelector((state: AppState) => state.viagemStatus);
    const [status,setStatus] = useState<string>("");
    const [searchTxt,setSearchTxt] = useState<string>("");
    const dispatch = useDispatch();


    function handleSearchClick(action:MouseEvent<HTMLButtonElement>){
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.searchStatus = status;
        newNavState.searchTxt = searchTxt;
        dispatch(startSetNavigation(newNavState));

    }


    function handleSearchTxtChange(action:ChangeEvent<HTMLInputElement>){
        action.preventDefault();
        setSearchTxt(action.target.value)
    }

    function handleStatusOptionChange(action:ChangeEvent<HTMLSelectElement>){
        action.preventDefault();
        setStatus(action.target.value);
    }

    function handleOrderOptionChange(action:ChangeEvent<HTMLSelectElement>){
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.viagemOrderBy = action.target.value;
        newNavState.atualizarListaViagens = true;
        dispatch(startSetNavigation(newNavState));
        console.log(navigationState)
    }

    return (
        <div id="search-container">
            <h4 className="search-title">Pesquisar viagem</h4>
            <form className="form-search" action="submit">

                <input className="txt-search" type="text" placeholder="Procure por OS, passageiro ou empresa" onChange={handleSearchTxtChange} />
                <span className="lblStatus">Status:</span>
                <select className="search-sel-status" onChange={handleStatusOptionChange}>
                    <option value="">Todos</option>
                    <option value={statusOptions.aguardando}>Aguardando</option>
                    <option value={statusOptions.confirmado}>Confirmado</option>
                    <option value={statusOptions.concluido}>Concluído</option>
                    <option value={statusOptions.cancelado}>Cancelado</option>
                </select>

                <span className="lblViagemOrder">Ordem:</span>
                <select className="search-sel-via-order" onChange={handleOrderOptionChange}>
                    <option value="via_dataHora_embarque">Data de Embarque</option>
                    <option value="via_dataHora_solicitacao">Data da Solicitação</option>
                    
                </select>
                <button className="btn-search-viagem" name="submit" onClick={handleSearchClick} >Buscar</button>
            </form>

        </div>
    );
}

export default SearchBlock;