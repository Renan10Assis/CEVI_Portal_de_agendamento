import React, { MouseEvent, ChangeEvent, useEffect, useState, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { FiCheck, FiEdit, FiArrowUpCircle } from 'react-icons/fi';
import api from '../../services/api';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { Motorista } from '../../store/ducks/types/Motorista';
import { startUpdateMotorista } from '../../store/ducks/actions/Motorista';



const MotoristaGridEdit = () => {



    const dispatch = useDispatch();
    const motoristaState = useSelector((state: AppState) => state.motoristas);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const listaStatus = useSelector((state: AppState) => state.viagemStatus);
    const authUserState = useSelector((state: AppState) => state.authUsuarios);
    const [editData, setEditData] = useState<boolean>(false);
    const [nomeMot, setNomeMot] = useState<string>("");
    const [telMot, setTelMot] = useState<string>("");
    const [sexoMot, setSexoMot] = useState<string>("");
    const [nascMot, setNascMot] = useState<string>("");
    const [marcaMot, setMarcaMot] = useState<string>("");
    const [modeloMot, setModeloMot] = useState<string>("");
    const [anoModeloMot, setAnoModeloMot] = useState<string>("");
    const [corMot, setCorMot] = useState<string>("");
    const [placaMot, setPlacaMot] = useState<string>("");
    const [viaturaMot, setViaturaMot] = useState<string>("");
    const [statusMot, setStatusMot] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [anos, setAnos] = useState<string[]>([]);

    const [initialMot, setInitialMot] = useState<Motorista>({
        mot_id: "",
        mot_nome: "",
        mot_cpf: "",
        mot_telefone: "",
        mot_marca: "",
        mot_modelo: "",
        mot_cor: "",
        mot_sexo: "",
        mot_nascimento: "",
        mot_anoModelo: "",
        mot_placa: "",
        mot_numeroViatura: "",
        mot_status: ""

    });


    useEffect(() => {
        motoristaState.map(mot => {
            if (mot.mot_id === navigationState.motoristaIDClicked) {
                setInitialMot(mot);
                setNomeMot(mot.mot_nome);
                setNascMot(mot.mot_nascimento);
                setTelMot(mot.mot_telefone);
                setSexoMot(mot.mot_sexo);
                setStatusMot(mot.mot_status);
                setMarcaMot(mot.mot_marca);
                setModeloMot(mot.mot_modelo);
                setAnoModeloMot(mot.mot_anoModelo);
                setCorMot(mot.mot_cor);
                setPlacaMot(mot.mot_placa);
                setViaturaMot(mot.mot_numeroViatura);
            }

            return null;
        });

    }, [navigationState.motoristaIDClicked]);

    useEffect(() => {
        if (editData) {
            let anosModelo:string[]=[];
            for (let i = 1900; i <= 2030; i++) {
                anosModelo.push(String(i));
            }
            setAnos(anosModelo);
        }
    }, [editData]);


    function handleNomeChange(action: ChangeEvent<HTMLInputElement>) {
        setNomeMot(action.target.value);
    }

    function handleTelefoneChange(action: ChangeEvent<HTMLInputElement>) {
        setTelMot(action.target.value);
    }

    function handleSexoChange(action: ChangeEvent<HTMLSelectElement>) {
        setSexoMot(action.target.value);
    }

    function handleNascimentoChange(action: ChangeEvent<HTMLInputElement>) {
        setNascMot(action.target.value);
    }

    function handleMarcaChange(action: ChangeEvent<HTMLInputElement>) {
        setMarcaMot(action.target.value);
    }

    function handleModeloChange(action: ChangeEvent<HTMLInputElement>) {
        setModeloMot(action.target.value);
    }


    function handleCorChange(action: ChangeEvent<HTMLInputElement>) {
        setCorMot(action.target.value);
    }

    function handleAnoModeloChange(action: ChangeEvent<HTMLSelectElement>) {
        setAnoModeloMot(action.target.value);
    }

    function handlePlacaChange(action: ChangeEvent<HTMLInputElement>) {
        setPlacaMot(action.target.value);
    }

    function handleViaturaChange(action: ChangeEvent<HTMLInputElement>) {
        setViaturaMot(action.target.value);
    }

    function handleStatusChange(action: ChangeEvent<HTMLSelectElement>) {
        setStatusMot(action.target.value);
    }



    function handleRetrairClick(action: MouseEvent<HTMLDivElement>) {
        if (editData) {
            alert("Salve as alterações antes de fechar!");
        } else {

            let newNavState = navigationState;
            newNavState.motoristaIDClicked = "";
            setMsg("");
            dispatch(startSetNavigation(newNavState));
        }
    }


    const handleUpdateData = (action: MouseEvent<SVGElement>) => {

        action.preventDefault();

        try {


            const motData: Motorista = {
                mot_id: initialMot.mot_id,
                mot_nome: nomeMot,
                mot_cpf: initialMot.mot_cpf,
                mot_telefone: telMot,
                mot_sexo: sexoMot,
                mot_nascimento: nascMot,
                mot_marca: marcaMot,
                mot_modelo: modeloMot,
                mot_anoModelo: anoModeloMot,
                mot_cor: corMot,
                mot_placa: placaMot,
                mot_numeroViatura: viaturaMot,
                mot_status: statusMot
            }


            document.getElementById("msgMotStatus")?.setAttribute("style", "color:white");
            setMsg("Atualizando motorista...");

            api.put("/motoristas", (motData)).then(res => {

                if (!res.data.erro) {
                    document.getElementById("msgMotStatus")?.setAttribute("style", "color:darkgreen");
                    setInitialMot(res.data);
                    dispatch(startUpdateMotorista(initialMot));
                    setMsg("Alteração bem sucedida!");
                    setEditData(false);
                }
            }).catch(err => {
                document.getElementById("msgMotStatus")?.setAttribute("style", "color:yellow");
                setMsg("Falha na comunicação com servidor!");
                return console.log(err)
            });

        } catch (err) {
            console.log(err);
            setMsg("Erro interno!");
        }


    }



    return (
        <div id="grid-container">

            <form action="submit" className={navigationState.motoristaIDClicked ? "grid-mot-edit" : "grid-mot-edit-hidden"}>

                <div className="secaoMotDados">
                    <span className="motorista-title-lbl">Dados do motorista</span>

                    <span className="edit-motor-rotulo">Nome do motorista</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-motor-nome"}>{initialMot.mot_nome}</span>
                    <input type="text" className={!editData ? "edit-motor-data-hidden" : "edit-motor-nome"} placeholder={initialMot.mot_nome} onChange={handleNomeChange} />

                    <span className="edit-motor-rotulo">Gênero</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-motor-sexo"}>{initialMot.mot_sexo}</span>
                    <select className={!editData ? "edit-motor-data-hidden" : "edit-motor-sexo"} value={sexoMot} onChange={handleSexoChange}>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outros">Outros</option>
                    </select>

                    <span className="edit-motor-rotulo">CPF</span>
                    <span className={!editData ? "edit-motor-data-hidden" : "edit-motor-cpf"}>{initialMot.mot_cpf}</span>

                    <span className="edit-motor-rotulo">Data de Nascimento</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-motor-nasc"}>{initialMot.mot_nascimento}</span>
                    <input className={!editData ? "edit-motor-data-hidden" : "edit-motor-nasc"} placeholder={initialMot.mot_nascimento} onChange={handleNascimentoChange} />

                    <span className="edit-motor-rotulo">Telefone</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-motor-tel"}>{initialMot.mot_telefone}</span>
                    <input className={!editData ? "edit-motor-data-hidden" : "edit-motor-tel"} placeholder={initialMot.mot_telefone} onChange={handleTelefoneChange} />


                    <span className="edit-motor-rotulo">Status</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-motor-status"}>{initialMot.mot_status}</span>
                    <select placeholder={initialMot.mot_status} disabled={editData ? false : true} className={authUserState.user.usu_tipo === "Administrador" && editData ? "edit-motor-status" : "edit-motor-data-hidden"} onChange={handleStatusChange}>
                        <option value={listaStatus.ativo}>{listaStatus.ativo}</option>
                        <option value={listaStatus.inativo}>{listaStatus.inativo}</option>

                    </select>

                </div>
                <span className="mot-divisoria"></span>

                <div className="secaoVeicDados">
                    <span className="veiculo-title-lbl">Dados do veículo</span>

                    <span className="edit-veic-rotulo">Marca</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-veic-marca"}>{initialMot.mot_marca}</span>
                    <input className={!editData ? "edit-motor-data-hidden" : "edit-veic-marca"} placeholder={initialMot.mot_marca} onChange={handleMarcaChange} />

                    <span className="edit-veic-rotulo">Modelo</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-veic-modelo"}>{initialMot.mot_modelo}</span>
                    <input className={!editData ? "edit-motor-data-hidden" : "edit-veic-modelo"} placeholder={initialMot.mot_modelo} onChange={handleModeloChange} />


                    <span className="edit-veic-rotulo">Ano do modelo</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-veic-ano"}>{initialMot.mot_anoModelo}</span>
                    <select className={!editData ? "edit-motor-data-hidden" : "edit-veic-ano"} value={anoModeloMot} onChange={handleAnoModeloChange}>
                        {anos.map(ano=>{
                            return <option key={ano} value={ano}>{ano}</option>
                        })
                        }
                    </select>


                    <span className="edit-veic-rotulo">Cor</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-veic-cor"}>{initialMot.mot_cor}</span>
                    <input className={!editData ? "edit-motor-data-hidden" : "edit-veic-cor"} placeholder={corMot} onChange={handleCorChange} />


                    <span className="edit-veic-rotulo">Placa</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-veic-placa"}>{initialMot.mot_placa}</span>
                    <input className={!editData ? "edit-motor-data-hidden" : "edit-veic-placa"} placeholder={initialMot.mot_placa} onChange={handlePlacaChange} />


                    <span className="edit-veic-rotulo">Número da viatura</span>
                    <span className={editData ? "edit-motor-data-hidden" : "edit-veic-viatura"}>{initialMot.mot_numeroViatura}</span>
                    <input className={!editData ? "edit-motor-data-hidden" : "edit-veic-viatura"} placeholder={initialMot.mot_numeroViatura} onChange={handleViaturaChange} />


                </div>

                <div className="secaoMotButtons">
                    <span id="msgMotStatus">{msg}</span>
                    <FiCheck name="submit" id="icon-mot-confirm" visibility={authUserState.user.usu_tipo === "Administrador" && editData && navigationState.motoristaIDClicked ? "visible" : "hidden"} onClick={handleUpdateData} />
                    <FiEdit id="icon-mot-edit" visibility={authUserState.user.usu_tipo === "Administrador" && !editData && navigationState.motoristaIDClicked ? "visible" : "hidden"} onClick={() => setEditData(true)} />
                </div>

                <div className="secaoMotRetrair" onClick={handleRetrairClick}><FiArrowUpCircle />Fechar</div>
            </form>
        </div>
    );

}

export default memo(MotoristaGridEdit);
