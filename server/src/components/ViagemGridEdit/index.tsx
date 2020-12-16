import React, { MouseEvent, ChangeEvent, useEffect, useState, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { Viagem } from "../../store/ducks/types/Viagem";
import { Motorista } from '../../store/ducks/types/Motorista';
import { FiCheck, FiEdit, FiArrowUpCircle } from 'react-icons/fi';
import api from '../../services/api';
import { startUpdateMotViagem } from '../../store/ducks/actions/Viagem';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';



const ViagemGridEdit = () => {
    const dispatch = useDispatch();
    const motoristaState = useSelector((state: AppState) => state.motoristas);
    const viagemState = useSelector((state: AppState) => state.viagens);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const [editData, setEditData] = useState<boolean>(false);
    const [optionMot, setOptionMot] = useState<string>("");
    const listaStatus = useSelector((state: AppState) => state.viagemStatus);
    const [msg, setMsg] = useState<string>("");
    const authUserState = useSelector((state: AppState) => state.authUsuarios);

    const [viagem, setViagem] = useState<Viagem>({
        via_os: '',
        via_mot_id: '',
        via_nomePassageiro: '',
        via_telPassageiro: '',
        empresa_solicitante: '',
        empresa_viagem: '',
        solicitante: '',
        via_end_origem: '',
        via_end_destino: '',
        via_dataHora_solicitacao: '',
        via_dataHora_embarque: '',
        via_observacao: '',
        via_status: '',

    });

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
        viagemState.map(via => {
            if (via.via_os === navigationState.viagemOSClicked) {
                setViagem(via);
                setOptionMot(via.via_mot_id);
            }
            return null;
        });
    }, [navigationState.viagemOSClicked]);

    useEffect(() => {
        if (optionMot) {
            motoristaState.map(mot => {
                if (mot.mot_id === optionMot) {
                    return setMotorista(mot);

                }
            });
        } else {
            return setMotorista(initialMotState);
        }
    }, [optionMot]);



    function handleOptionChange(action: ChangeEvent<HTMLSelectElement>) {
        setOptionMot(action.target.value);
    }


    function handleRetrairClick(action: MouseEvent<HTMLDivElement>) {
        if (editData) {
            alert("Salve as alterações antes de fechar!");
        } else {

            let newNavState = navigationState;
            newNavState.viagemOSClicked = "";
            setMsg("");
            dispatch(startSetNavigation(newNavState));
        }
    }


    const handleUpdateData = (action: MouseEvent<SVGElement>) => {

        try {

            const viagemData = viagem;
            viagemData.via_mot_id = motorista.mot_id;
            viagemData.via_status = motorista.mot_id ? listaStatus.confirmado : listaStatus.aguardando;

            document.getElementById("msgViaStatus")?.setAttribute("style", "color:white");
            setMsg("Atualizando motorista...");

            api.put("/viagens/upd-mot", ({ via_os: viagemData.via_os, via_mot_id: viagemData.via_mot_id })).then(res => {

                if (res.data.success) {
                    dispatch(startUpdateMotViagem(viagem));
                    document.getElementById("msgViaStatus")?.setAttribute("style", "color:darkgreen");
                    setMsg("Alteração bem sucedida!");
                    setEditData(false);
                }
            }).catch(err => {
                document.getElementById("msgViaStatus")?.setAttribute("style", "color:yellow");
                setMsg("Falha na comunicação com servidor!");
                return console.log(err)
            });
            setMsg("Atualizando status...");

            api.put("/viagens/upd-status", ({ via_os: viagemData.via_os, via_status: viagemData.via_status })).then(res => {

                if (res.data.success) {
                    dispatch(startUpdateMotViagem(viagem));
                    document.getElementById("msgViaStatus")?.setAttribute("style", "color:darkgreen");
                    setMsg("Alteração bem sucedida!");
                    setEditData(false);
                }
            }).catch(err => {
                document.getElementById("msgViaStatus")?.setAttribute("style", "color:yellow");
                setMsg("Falha na comunicação com servidor!");
                return console.log(err)
            });




        } catch (err) {
            console.log(err);
        }


    }



    return (
        <div id="grid-container">

            <form action="submit" className={navigationState.viagemOSClicked ? "grid-edit" : "grid-edit-hidden"}>
                <div className="secao">

                    <span className="rotulo">OS:</span>
                    <span className="edit-os">{viagem.via_os}</span>

                    <span className="rotulo">Data Solicitação:</span>
                    <span className="edit-dt">{viagem.via_dataHora_solicitacao}</span>

                    <span className="rotulo">Solicitante:</span>
                    <span className="edit-solic">{viagem.solicitante} - {viagem.empresa_solicitante}</span>
                </div>

                <div className="secao">

                    <span className="rotulo">Nome Passageiro:</span>
                    <span className="edit-nomePass">{viagem.via_nomePassageiro}</span>

                    <span className="rotulo">Empresa:</span>
                    <span className="edit-empresa">{viagem.empresa_viagem}</span>

                    <span className="rotulo">Telefone Passageiro:</span>
                    <span className="edit-telPass">{viagem.via_telPassageiro}</span>


                </div>

                <div className="secao">
                    <span className="rotulo">Data/Hora Embarque:</span>
                    <span className="edit-dt">{viagem.via_dataHora_embarque}</span>
                </div>

                <div className="secao">
                    <span className="rotulo">Endereço Origem:</span>
                    <span className="txt-endereco">{viagem.via_end_origem}</span>
                </div>

                <div className="secao">
                    <span className="rotulo">Endereço Destino:</span>
                    <span className="txt-endereco">{viagem.via_end_destino}</span>
                </div>


                <div className="secao">

                    <select id="escolha" disabled={editData ? false : true}  className={authUserState.user.usu_tipo === "Administrador" ? "mot-select" : "mot-select-hidden"} onChange={handleOptionChange}>
                        <option value=""></option>
                        {motoristaState.map(mot => {
                            return mot.mot_status==="Ativo"?<option key={mot.mot_id} value={mot.mot_id}>{mot.mot_nome}</option>:null;
                        }
                        )}

                    </select>
                    <span className="rotulo">Motorista:</span>
                    <span className="mot_data">{motorista.mot_nome}</span>

                    <span className="rotulo">Sexo:</span>
                    <span className="mot_data">{motorista.mot_sexo}</span>

                    <span className="rotulo">Marca:</span>
                    <span className="mot_data">{motorista.mot_marca}</span>

                    <span className="rotulo">Modelo:</span>
                    <span className="mot_data">{motorista.mot_modelo}</span>

                    <span className="rotulo">Cor:</span>
                    <span className="mot_data">{motorista.mot_cor}</span>

                    <span className="rotulo">Placa:</span>
                    <span className="mot_data">{motorista.mot_placa}</span>

                    <span className="rotulo">Numero da Viatura:</span>
                    <span className="mot_data">{motorista.mot_numeroViatura}</span>

                    <span className="rotulo">Status:</span>
                    <span className="edit-status">{viagem.via_status}</span>

                </div>

                <div className="secaoViaButtons">

                    <span id="msgViaStatus">{msg}</span>
                    <FiCheck name="submit" id="icon-via-confirm" visibility={authUserState.user.usu_tipo === "Administrador" && editData && navigationState.viagemOSClicked ? "visible" : "hidden"} onClick={handleUpdateData} />
                    <FiEdit id="icon-via-edit" visibility={authUserState.user.usu_tipo === "Administrador" && !editData && navigationState.viagemOSClicked && viagem.via_status!== listaStatus.concluido ? "visible" : "hidden"} onClick={() => setEditData(true)} />
                </div>

                <div className="secaoViaRetrair" onClick={handleRetrairClick}>
                    <FiArrowUpCircle />
                    Fechar
                </div>

            </form>
        </div>
    );

}

export default memo(ViagemGridEdit);
