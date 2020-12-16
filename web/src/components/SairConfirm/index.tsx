import React, {MouseEvent} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { startLogoutUsuario } from "../../store/ducks/actions/AuthUsuario";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import "./styles.css";


const SairConfirm = () => {
    const navegacaoState = useSelector((state:AppState)=>state.navigation);
    const dispatch = useDispatch();
    
    function handleSairSim(action: MouseEvent<HTMLButtonElement>) {
        if (navegacaoState.profileSairClicked) {
            dispatch(startLogoutUsuario());
            document.location.assign("/");
        }
    }

    function handleSairNão(action: MouseEvent<HTMLButtonElement>) {
        if (navegacaoState.profileSairClicked) {
            let newNavState = navegacaoState;
            newNavState.profileSairClicked = false;
            dispatch(startSetNavigation(newNavState));
        }
    }

    return (
        <div id="sair-confirm">

            < div className="logout-visible">
                <span className="logout-message">Deseja realmente sair?</span>
                <button className="btn-logout-yes" onClick={handleSairSim}>Sim</button>
                <button className="btn-logout-no" onClick={handleSairNão}>Não</button>
            </div >

        </div>
    );
}

export default SairConfirm;
