import React, { MouseEvent, ChangeEvent, useEffect, useState, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { Viagem } from "../../store/ducks/types/Viagem";
import { Motorista } from '../../store/ducks/types/Motorista';
import api from '../../services/api';
import { startUpdateMotViagem } from '../../store/ducks/actions/Viagem';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';



const ViagemGridEdit = () => {
    const dispatch = useDispatch();
    const motoristaState = useSelector((state: AppState) => state.motoristas);
    const viagemState = useSelector((state: AppState) => state.viagens);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const [editData, setEditData] = useState<boolean>(false);
    const [defaultMot, setDefaultMot] = useState<string>("Não atribuído");
    const [optionMot, setOptionMot] = useState<string>(defaultMot);
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
        mot_nome: defaultMot,
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
        if (optionMot !== defaultMot) {
            motoristaState.map(mot => {
                if (mot.mot_id === optionMot) {
                    setMotorista(mot);

                }
            });
        } else {
            setMotorista(initialMotState);
        }
    }, [optionMot]);


    function handleEditClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        setEditData(true);
    }

    function handleFecharClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        if (editData) {
            return alert("Salve as alterações antes de sair!");
        }
        let newNavState = navigationState;
        newNavState.viagemOSClicked = "";
        dispatch(startSetNavigation(newNavState));
    }

    function handleOptionChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        if (action.target.value !== defaultMot) {
            setOptionMot(action.target.value);
            viagem.via_status = listaStatus.confirmado;
        } else {
            setOptionMot(defaultMot);
            viagem.via_status = listaStatus.aguardando;
        }

    }



    const handleUpdateData = (action: MouseEvent<HTMLButtonElement>) => {

        action.preventDefault();
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
        <div id="grid-edit-container">

            <form action="submit" className="grid-viagem-edit">

                <div className="secao-title-inline">
                    <span className="lbl-via-detail-rotulo">Detalhes da viagem</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">OS:</span>
                    <span className="viagem-dados">{viagem.via_os}</span>
                </div>

                <div className="secao-dados-inline">

                    <span className="lbl-rotulo">Data Solicitação:</span>
                    <span className="viagem-dados">{viagem.via_dataHora_solicitacao}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Solicitante:</span>
                    <span className="viagem-dados">{viagem.solicitante} - {viagem.empresa_solicitante}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Nome Passageiro:</span>
                    <span className="viagem-dados">{viagem.via_nomePassageiro}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Empresa:</span>
                    <span className="viagem-dados">{viagem.empresa_viagem}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Telefone Passageiro:</span>
                    <span className="viagem-dados">{viagem.via_telPassageiro}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Observações:</span>
                    <span className="viagem-dados">{viagem.via_observacao}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Data/Hora Embarque:</span>
                    <span className="viagem-dados">{viagem.via_dataHora_embarque}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Endereço Origem:</span>
                    <span className="viagem-dados">{viagem.via_end_origem}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Endereço Destino:</span>
                    <span className="viagem-dados">{viagem.via_end_destino}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Motorista:</span>
                    <span className="viagem-dados">{motorista.mot_nome}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Sexo:</span>
                    <span className="viagem-dados">{motorista.mot_sexo}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Marca:</span>
                    <span className="viagem-dados">{motorista.mot_marca}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Modelo:</span>
                    <span className="viagem-dados">{motorista.mot_modelo}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Cor:</span>
                    <span className="viagem-dados">{motorista.mot_cor}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Placa:</span>
                    <span className="viagem-dados">{motorista.mot_placa}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Numero da Viatura:</span>
                    <span className="viagem-dados">{motorista.mot_numeroViatura}</span>
                </div>

                <div className="secao-dados-inline">
                    <span className="lbl-rotulo">Status:</span>
                    <span className="viagem-dados">{viagem.via_status}</span>
                </div>

                {authUserState.user.usu_tipo !== "Cliente" ? <div className="secao-dados-inline">
                    <span className="select-atribuir-rotulo">Atribuir motorista:</span>
                    <select value={optionMot} disabled={editData ? false : true} className="select-atribuir-dados" onChange={handleOptionChange}>
                        <option value={defaultMot}>{defaultMot}</option>
                        {motoristaState.map(mot => {
                            return mot.mot_status === "Ativo" ? <option key={mot.mot_id} value={mot.mot_id}>{mot.mot_nome}</option> : null;
                        }
                        )}
                    </select>
                </div> : null}

                <span id="msgViaStatus">{msg}</span>

                {authUserState.user.usu_tipo !== "Cliente" ? <button id="btn-edit-via-editar" onClick={handleEditClick}>Editar</button> : null}
                {authUserState.user.usu_tipo !== "Cliente" ? <button disabled={!editData} name="submit" id={editData ? "btn-edit-via-salvar" : "btn-edit-via-salvar-disabled"} onClick={handleUpdateData}>Salvar</button> : null}
                <button id="btn-edit-via-fechar" onClick={handleFecharClick}>Fechar</button>

            </form>
        </div>
    );

}

export default memo(ViagemGridEdit);
