import React, { MouseEvent, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { Motorista } from '../../store/ducks/types/Motorista';




const MotoristaGridData: React.FC<Motorista> = (props) => {
    const navigationState = useSelector((state: AppState) => state.navigation);
    const dispatch = useDispatch();

    const motoristaProp: Motorista = props;


    function handleViewMotDetails(action: MouseEvent<HTMLDivElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.motoristaIDClicked = motoristaProp.mot_id;
        dispatch(startSetNavigation(newNavState));
    }



    return (
        <div id="grid-mot-container">


            <div className="grid-mot-read" onClick={handleViewMotDetails}>

                <span className="rotulo-mot-nome">{motoristaProp.mot_nome}</span>
                <span className="rotulo-mot-tel">{motoristaProp.mot_telefone}</span>
                <span className="rotulo-mot-marca">{motoristaProp.mot_marca}</span>
                <span className="rotulo-mot-modelo">{motoristaProp.mot_modelo}</span>
                <span className="rotulo-mot-cor">{motoristaProp.mot_cor}</span>
                <span className="rotulo-mot-placa">{motoristaProp.mot_placa}</span>
                <span className="rotulo-mot-viat">{motoristaProp.mot_numeroViatura}</span>
                <span className="rotulo-mot-status">{motoristaProp.mot_status}</span>

            </div>

        </div>
    );

}

export default MotoristaGridData;
