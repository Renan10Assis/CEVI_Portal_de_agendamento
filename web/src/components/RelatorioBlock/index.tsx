import React,{MouseEvent} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import "./styles.css";


const RelatorioBlock = () =>{
    
    const dispatch = useDispatch();
    const navigationState = useSelector((state:AppState)=>state.navigation);

    function handleGerarClick(action:MouseEvent<HTMLButtonElement>){
        action.preventDefault();
        
        let newNavState = navigationState;
        newNavState.gerarRelatorioClicked = true;

        dispatch(startSetNavigation(newNavState));
    }
    
    return(
        <div className="relatorio-container">
            <span className="relat-label">Relatórios</span>
            <button id="btn-gera-rel" onClick={handleGerarClick}>Gerar</button>
        </div>
    );
}

export default RelatorioBlock;
