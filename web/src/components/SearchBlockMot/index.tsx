import React, {ChangeEvent, MouseEvent, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import { AppState } from "../../store/index";
import "./styles.css";


const SearchBlockMot = () => {
    const navigationState = useSelector((state:AppState)=>state.navigation);
    const statusOptions = useSelector((state: AppState) => state.viagemStatus);
    const [motStatus,setMotStatus] = useState<string>("");
    const [searchMotTxt,setSearchMotTxt] = useState<string>("");
    const dispatch = useDispatch();


    function handleSearchClick(action:MouseEvent<HTMLButtonElement>){
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.searchMotStatus = motStatus;
        newNavState.searchMotTxt = searchMotTxt;
        dispatch(startSetNavigation(newNavState));

    }


    function handleSearchMotTxtChange(action:ChangeEvent<HTMLInputElement>){
        action.preventDefault();
        setSearchMotTxt(action.target.value)
    }

    function handleMotStatusOptionChange(action:ChangeEvent<HTMLSelectElement>){
        action.preventDefault();
        setMotStatus(action.target.value);

    }

    return (
        <div id="search-mot-container">
            <h4 className="search-mot-title">Pesquisar motorista</h4>
            <form className="form-search-motorista" action="submit">

                <input className="txt-mot-search" type="text" placeholder="Procure pelo nome" onChange={handleSearchMotTxtChange} />
                <span className="lblmotStatus">Status:</span>
                <select className="search-sel-usu-status" onChange={handleMotStatusOptionChange}>
                    <option value="">Todos</option>
                    <option value={statusOptions.ativo}>Ativo</option>
                    <option value={statusOptions.inativo}>Inativo</option>
                    
                </select>
                <button className="btn-search-motorista" name="submit" onClick={handleSearchClick} >Buscar</button>
            </form>

        </div>
    );
}

export default SearchBlockMot;