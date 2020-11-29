import React, {ChangeEvent, MouseEvent, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import { AppState } from "../../store/index";
import "./styles.css";


const SearchBlockUser = () => {
    const navigationState = useSelector((state:AppState)=>state.navigation);
    const statusOptions = useSelector((state: AppState) => state.viagemStatus);
    const [userStatus,setUserStatus] = useState<string>("");
    const [searchUserTxt,setSearchUserTxt] = useState<string>("");
    const dispatch = useDispatch();


    function handleSearchClick(action:MouseEvent<HTMLButtonElement>){
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.searchUserStatus = userStatus;
        newNavState.searchUserTxt = searchUserTxt;
        dispatch(startSetNavigation(newNavState));

    }


    function handleSearchUserTxtChange(action:ChangeEvent<HTMLInputElement>){
        action.preventDefault();
        setSearchUserTxt(action.target.value)
    }

    function handleUserStatusOptionChange(action:ChangeEvent<HTMLSelectElement>){
        action.preventDefault();
        setUserStatus(action.target.value);
    }

    return (
        <div id="search-user-container">
            <h4 className="search-user-title">Pesquisar usuário</h4>
            <form className="form-search-usuario" action="submit">

                <input className="txt-user-search" type="text" placeholder="Procure pelo nome" onChange={handleSearchUserTxtChange} />
                <span className="lblUserStatus">Status:</span>
                <select className="search-sel-usu-status" onChange={handleUserStatusOptionChange}>
                    <option value="">Todos</option>
                    <option value={statusOptions.ativo}>Ativo</option>
                    <option value={statusOptions.inativo}>Inativo</option>
                    
                </select>
                <button className="btn-search-usuario" name="submit" onClick={handleSearchClick} >Buscar</button>
            </form>

        </div>
    );
}

export default SearchBlockUser;