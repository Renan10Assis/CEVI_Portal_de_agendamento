import React, {ChangeEvent, MouseEvent, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import { AppState } from "../../store/index";
import "./styles.css";


const SearchBlockEmp = () => {
    const navigationState = useSelector((state:AppState)=>state.navigation);
    const dispatch = useDispatch();
    const[searchTxt, setSearchTxt]=useState<string>("");



    function handleSearchEmpTxtChange(action:ChangeEvent<HTMLInputElement>){
        action.preventDefault();
        setSearchTxt(action.target.value);
    }

    function handleSearchClick(action:MouseEvent<HTMLButtonElement>){
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.searchEmpTxt = searchTxt;
        dispatch(startSetNavigation(newNavState));
    }


    return (
        <div id="search-emp-container">
            <h4 className="search-emp-title">Pesquisar empresa</h4>
            <form className="form-search-empresa" action="submit">

                <input className="txt-emp-search" type="text" placeholder="Procure por nome fantasia ou cnpj" onChange={handleSearchEmpTxtChange} />
                
                <button className="btn-search-empresa" name="submit" onClick={handleSearchClick} >Buscar</button>
            </form>

        </div>
    );
}

export default SearchBlockEmp;