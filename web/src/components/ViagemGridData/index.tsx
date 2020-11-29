import React, { MouseEvent, useEffect, useState, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { Viagem } from "../../store/ducks/types/Viagem";
import { Motorista } from '../../store/ducks/types/Motorista';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';




const ViagemGridData: React.FC<Viagem> = (props) => {
    const motoristaState = useSelector((state: AppState) => state.motoristas);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const dispatch = useDispatch();

    const viagemProp: Viagem = props;

    const initialMotState = {
        mot_id: "",
        mot_nome: "",
        mot_sexo: "",
        mot_cpf: "",
        mot_nascimento: "",
        mot_telefone: "",
        mot_marca: "",
        mot_modelo: "",
        mot_anoModelo: "",
        mot_cor: "",
        mot_placa: "",
        mot_numeroViatura: "",
        mot_status: ""
    }
    const [motorista, setMotorista] = useState<Motorista>(initialMotState);


    useEffect(() => {
        if (viagemProp.via_mot_id) {

            motoristaState.map(mot => {
                if (mot.mot_id === viagemProp.via_mot_id) {
                    setMotorista(mot);
                }

            });
        } else {
            setMotorista(initialMotState);
        }
    }, [motoristaState]);


    function handleViewDetails(action: MouseEvent<HTMLDivElement>) {
        let newNavState = navigationState;
        newNavState.viagemOSClicked = props.via_os;
        dispatch(startSetNavigation(newNavState));
    }



    return (
        <div id="grid-container">


            <div className={navigationState.viagemOSClicked ? "grid-read-hidden" : "grid-read"} onClick={handleViewDetails}>

                <span className="rotulo_os">{viagemProp.via_os}</span>
                <span className="rotulo_dtSol">{viagemProp.via_dataHora_solicitacao}</span>
                <span className="rotulo_sol">{viagemProp.solicitante} - {viagemProp.empresa_solicitante}</span>
                <span className="rotulo_nomePass">{viagemProp.via_nomePassageiro}</span>
                <span className="rotulo_telPass">{viagemProp.via_telPassageiro}</span>
                <span className="rotulo_emp">{viagemProp.empresa_viagem}</span>
                <span className="rotulo_dtEmb">{viagemProp.via_dataHora_embarque}</span>
                <span className="rotulo_mot">{motorista.mot_nome}</span>
                <span className="rotulo_status">{viagemProp.via_status}</span>
            </div>

        </div>
    );

}

export default memo(ViagemGridData);
