import React, { MouseEvent, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { Empresa } from '../../store/ducks/types/Empresa';


const EmpresaGridData: React.FC<Empresa> = (props) => {
    const navigationState = useSelector((state: AppState) => state.navigation);
    const dispatch = useDispatch();

    const empresaProp: Empresa = props;


    function handleViewMotDetails(action: MouseEvent<HTMLDivElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.empresaIDClicked = empresaProp.emp_id;
        dispatch(startSetNavigation(newNavState));
    }



    return (
        <div id="grid-emp-container">


            <div className={navigationState.empresaIDClicked ? "grid-emp-read-hidden" : "grid-emp-read"} onClick={handleViewMotDetails}>

                <span className="rotulo-emp-nome">{empresaProp.emp_nomeFantasia}</span>
                <span className="rotulo-emp-cnpj">{empresaProp.emp_cnpj}</span>
                <span className="rotulo-emp-endereco">{empresaProp.emp_endereco}</span>
              

            </div>

        </div>
    );

}

export default EmpresaGridData;
