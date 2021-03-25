import React, {MouseEvent} from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import "./styles.css";


const NovoUsuario = () => {
    const navigationState = useSelector((state: AppState) => state.navigation);
    const dispatch = useDispatch();

    function handleNovoUsuClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.novoUsuClicked = true;
        dispatch(startSetNavigation(newNavState));
    }

    return (
        <div id="novo-usu-create-container">
            <span className="novo-usu-label">Adicionar novo usuário no sistema</span>
            <button className="btn-novo-usuario" onClick={handleNovoUsuClick}>Novo usuário</button>
        </div>
    );

}

export default NovoUsuario;