import React, {MouseEvent} from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import "./styles.css";


const SolicitarViagem = () => {
    const navigationState = useSelector((state: AppState) => state.navigation);
    const dispatch = useDispatch();

    function handleSolicitarClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.solicitarViagemClicked = true;
        dispatch(startSetNavigation(newNavState));
    }

    return (
        <div id="via-create-container">

            <span className="solicitar-label">Solicite uma viagem</span>
            <button className="btn-solicitar" onClick={handleSolicitarClick}>Solicitar</button>
        </div>
    );

}

export default SolicitarViagem;