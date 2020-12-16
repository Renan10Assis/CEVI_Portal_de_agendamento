import axios from "axios";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { AppState } from "../../store";
import { startSetNavigation } from "../../store/ducks/actions/Navigation";
import { startCreateViagem } from "../../store/ducks/actions/Viagem";
import { Empresa } from "../../store/ducks/types/Empresa";
import { Viagem } from "../../store/ducks/types/Viagem";
import DataAtual from "../../util/DataAtual";
import { CepMask } from "../../util/CepMask";
import "./styles.css";
import { TelMask } from "../../util/TelMask";
import DataHoraComponent from "../DataHoraComponent";

interface ViagemData {
    via_usu_id: string;
    via_emp_id: string;
    via_mot_id: string;
    via_nomePassageiro: string;
    via_telPassageiro: string;
    via_end_origem: string;
    via_end_destino: string;
    via_dataHora_solicitacao: string;
    via_dataHora_embarque: string;
    via_observacao: string;
    via_status: string;
}



const ViagemGridCreate = () => {

    const dispatch = useDispatch();
    const navigationState = useSelector((state: AppState) => state.navigation);
    const authUserState = useSelector((state: AppState) => state.authUsuarios);
    const empresaState = useSelector((state: AppState) => state.empresas);
    const listaStatusState = useSelector((state: AppState) => state.viagemStatus);
    const [novoEnderecoOrigem, setNovoEnderecoOrigem] = useState<boolean>(true);
    const [novoEnderecoDestino, setNovoEnderecoDestino] = useState<boolean>(true);

    const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa>({
        emp_id: "",
        emp_cnpj: "",
        emp_endereco: "",
        emp_nomeFantasia: ""
    });

    const [passNome, setPassNome] = useState<string>("");
    const [passTel, setPassTel] = useState<string>("");
    const [passEmpresa, setPassEmpresa] = useState<string>("");
    const [dataHora, setDataHora] = useState<string>("");
    const [observacao, setObservacao] = useState<string>("");
    const [cepOri, setCepOri] = useState<string>("");
    const [lograOri, setLograOri] = useState<string>("");
    const [bairroOri, setBairroOri] = useState<string>("");
    const [numOri, setNumOri] = useState<string>("");
    const [ufOri, setUfOri] = useState<string>("");
    const [cidadeOri, setCidadeOri] = useState<string>("");
    const [cepDest, setCepDest] = useState<string>("");
    const [lograDest, setLograDest] = useState<string>("");
    const [bairroDest, setBairroDest] = useState<string>("");
    const [numDest, setNumDest] = useState<string>("");
    const [ufDest, setUfDest] = useState<string>("");
    const [cidadeDest, setCidadeDest] = useState<string>("");


    useEffect(() => {
        if (cepOri.length == 10) {

            const cep = cepOri.replace(".", "").replace("-", "");
            const req = `https://viacep.com.br/ws/${cep}/json/`;

            axios({
                method: 'GET',
                url: req,


            }).then(res => {
                if (res.data.cep) {

                    setLograOri(res.data.logradouro);
                    setBairroOri(res.data.bairro);
                    setUfOri(res.data.uf);
                    setCidadeOri(res.data.localidade);
                } else {
                    setLograOri("");
                    setBairroOri("");
                    setUfOri("");
                    setCidadeOri("");
                }

            }).catch(err => console.log(err));
        }

    }, [cepOri]);

    useEffect(() => {
        if (cepDest.length == 10) {

            const cep = cepDest.replace(".", "").replace("-", "");
            const req = `https://viacep.com.br/ws/${cep}/json/`;

            axios({
                method: 'GET',
                url: req,

            }).then(res => {
                if (res.data.cep) {

                    setLograDest(res.data.logradouro);
                    setBairroDest(res.data.bairro);
                    setUfDest(res.data.uf);
                    setCidadeDest(res.data.localidade);
                } else {
                    setLograDest("");
                    setBairroDest("");
                    setUfDest("");
                    setCidadeDest("");
                }

            }).catch(err => console.log(err));

        }

    }, [cepDest]);

    useEffect(() => {
        empresaState.map(emp => {
            if (emp.emp_nomeFantasia === authUserState.user.emp_nomeFantasia) {
                setSelectedEmpresa(emp);
                setPassEmpresa(emp.emp_id);
            }
            setNovoEnderecoOrigem(false);
        });


    }, [navigationState.solicitarViagemClicked]);


    useEffect(() => {
        empresaState.map(emp => {
            if (emp.emp_id === passEmpresa) {
                setSelectedEmpresa(emp);
            }
        });


    }, [passEmpresa]);


    useEffect(() => {
        let endereco = selectedEmpresa.emp_endereco;
        endereco = selectedEmpresa.emp_endereco.trim();
        endereco = endereco.replace("-", ",");
        let enderParts: string[] = endereco.split(",");

        if (!novoEnderecoOrigem) {

            setLograOri(enderParts[0]);
            setNumOri(enderParts[1]);
            setBairroOri(enderParts[2]);
            setCidadeOri(enderParts[3]);
            setUfOri(enderParts[4])

        } else {

            setCepOri("");
            setLograOri("");
            setBairroOri("");
            setNumOri("");
            setCidadeOri("");
            setUfOri("")
        }

    }, [novoEnderecoOrigem]);


    useEffect(() => {
        let endereco = selectedEmpresa.emp_endereco;
        endereco = selectedEmpresa.emp_endereco.trim();
        endereco = endereco.replace("-", ",");
        let enderParts: string[] = endereco.split(",");


        if (!novoEnderecoDestino) {

            setLograDest(enderParts[0]);
            setNumDest(enderParts[1]);
            setBairroDest(enderParts[2]);
            setCidadeDest(enderParts[3]);
            setUfDest(enderParts[4])

        } else {

            setCepDest("");
            setLograDest("");
            setBairroDest("");
            setNumDest("");
            setCidadeDest("");
            setUfDest("")
        }
    }, [novoEnderecoDestino]);


    function clearVariables() {
        setPassNome("");
        setPassTel("");
        setPassEmpresa("");
        setDataHora("");
        setObservacao("");
        setCepOri("");
        setLograOri("");
        setBairroOri("");
        setNumOri("");
        setUfOri("");
        setCidadeOri("");
        setCepDest("");
        setLograDest("");
        setBairroDest("");
        setNumDest("");
        setUfDest("");
        setCidadeDest("");
    }


    function handleSairSolClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.solicitarViagemClicked = false;
        dispatch(startSetNavigation(newNavState));
        clearVariables();
    }

    function handleRadioEmpresaOriClick(action: MouseEvent<HTMLSpanElement>) {
        action.preventDefault();
        setNovoEnderecoOrigem(false);

    }

    function handleRadioOutroOriClick(action: MouseEvent<HTMLSpanElement>) {
        action.preventDefault();
        setNovoEnderecoOrigem(true);
    }

    function handleRadioEmpresaOriChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setNovoEnderecoOrigem(false);

    }

    function handleRadioOutroOriChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setNovoEnderecoOrigem(true);
    }

    function handleRadioEmpresaDestClick(action: MouseEvent<HTMLSpanElement>) {
        action.preventDefault();
        setNovoEnderecoDestino(false);
    }

    function handleRadioOutroDestClick(action: MouseEvent<HTMLSpanElement>) {
        action.preventDefault();
        setNovoEnderecoDestino(true);
    }

    function handleRadioEmpresaDestChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setNovoEnderecoDestino(false);
    }

    function handleRadioOutroDestChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setNovoEnderecoDestino(true);
    }

    function handlePassChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setPassNome(action.target.value);
    }

    function handlePassTelChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setPassTel(TelMask(action.target.value));
    }

    function handleEmpresaChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        setPassEmpresa(action.target.value);
    }


    function handleObsChange(action: ChangeEvent<HTMLTextAreaElement>) {
        action.preventDefault();
        setObservacao(action.target.value);
    }

    function handleCepOriChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setCepOri(CepMask(action.target.value));
    }


    function handleLograOriChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setLograOri(action.target.value);
    }

    function handleBairroOriChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setBairroOri(action.target.value);
    }

    function handleNumOriChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setNumOri(action.target.value);
    }

    function handleUfOriChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        setUfOri(action.target.value);
    }

    function handleCidadeOriChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        setCidadeOri(action.target.value);
    }

    function handleCepDestChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setCepDest(CepMask(action.target.value));
    }

    function handleLograDestChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setLograDest(action.target.value);
    }

    function handleBairroDestChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setBairroDest(action.target.value);
    }

    function handleNumDestChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setNumDest(action.target.value);
    }

    function handleUfDestChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        setUfDest(action.target.value);
    }

    function handleCidadeDestChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        setCidadeDest(action.target.value);
    }

    function handleEfetuarSoliClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();

        if (!passNome || !passTel || !dataHora || !lograOri || !bairroOri || !numOri || !ufOri || !cidadeOri || !lograDest || !bairroDest || !numDest || !ufDest || !cidadeDest) {
            return alert("Preencha todos os campos!");
        }




        const endOrigem = novoEnderecoOrigem ? (lograOri + ", " + numOri + ", " + bairroOri + ", " + cidadeOri + " - " + ufOri) : selectedEmpresa.emp_endereco;
        const endDestino = novoEnderecoDestino ? (lograDest + ", " + numDest + ", " + bairroDest + ", " + cidadeDest + " - " + ufDest) : selectedEmpresa.emp_endereco;

        if (endOrigem === endDestino) {
            return alert("Atençao! O endereço de origem e destino são iguais");
        }

        let viagemData: ViagemData = {
            via_usu_id: authUserState.user.usu_id,
            via_emp_id: selectedEmpresa.emp_id,
            via_mot_id: "",
            via_nomePassageiro: passNome,
            via_telPassageiro: passTel,
            via_end_origem: endOrigem,
            via_end_destino: endDestino,
            via_dataHora_solicitacao: DataAtual(),
            via_dataHora_embarque: dataHora,
            via_observacao: observacao,
            via_status: listaStatusState.aguardando
        }

        console.log(cidadeOri, cidadeDest)

        try {

            api.post('/viagens', ((viagemData))).then(res => {
                let dispatchViagem: Viagem = {
                    via_os: res.data.via_os,
                    empresa_solicitante: authUserState.user.emp_nomeFantasia,
                    empresa_viagem: selectedEmpresa.emp_nomeFantasia,
                    solicitante: authUserState.user.usu_nome,
                    via_dataHora_embarque: res.data.via_dataHora_embarque,
                    via_dataHora_solicitacao: res.data.via_dataHora_solicitacao,
                    via_end_origem: res.data.via_end_origem,
                    via_end_destino: res.data.via_end_destino,
                    via_mot_id: res.data.via_mot_id,
                    via_nomePassageiro: res.data.via_nomePassageiro,
                    via_observacao: res.data.via_observacao,
                    via_status: res.data.via_status,
                    via_telPassageiro: res.data.via_telPassageiro
                };

                dispatch(startCreateViagem(dispatchViagem));
                alert("Viagem agendada com sucesso!");
                clearVariables();

                let newNavState = navigationState;
                newNavState.solicitarViagemClicked = false;
                dispatch(startSetNavigation(newNavState));

            }).catch(err => console.log(err));

        } catch (err) {
            console.log(err);
        }

    }




    return (
        <div id="solicitar-viagem-container">


            <form action="submit" className="solicitar-viagem-div">

                <span className="viagem-solic-title">Solicitação de agendamento de viagem</span>

                <span className="viagem-solic-pass">Nome do passageiro(a):</span>
                <input value={passNome} type="text" className="via-inp-pass" onChange={handlePassChange} />

                <span className="viagem-solic-tel">Telefone passageiro(a):</span>
                <input value={passTel} type="text" className="via-inp-tel" onChange={handlePassTelChange} />

                <span className="viagem-solic-empresa">Empresa:</span>
                <select disabled={authUserState.user.usu_tipo === "Cliente" ? true : false} value={passEmpresa} className="sel-inp-emp" onChange={handleEmpresaChange}>
                    {
                        empresaState.map(empresa => {
                            return <option key={empresa.emp_id} value={empresa.emp_id}>{empresa.emp_nomeFantasia}</option>
                        })
                    }
                </select>

                <span className="viagem-solic-dtHr">Data/Hora do embarque:</span>
                <span className="via-inp-dtHr">
                    <DataHoraComponent setDataHora={setDataHora} />
                </span>

                <span className="viagem-solic-obs">Observações:</span>
                <textarea value={observacao} className="via-inp-obs" onChange={handleObsChange} />

                <div className="viagem-ender-origem">
                    <span className="viagem-solic-endOri-title">Endereço de Origem</span>

                    <input id="radio-empresa-ender" checked={!novoEnderecoOrigem} type="radio" onChange={handleRadioEmpresaOriChange} />
                    <span className="viagem-solic-emp-end" onClick={handleRadioEmpresaOriClick} >Endereço da empresa</span>

                    <input id="radio-outro-ender" checked={novoEnderecoOrigem} type="radio" onChange={handleRadioOutroOriChange} />
                    <span className="viagem-solic-outro-end" onClick={handleRadioOutroOriClick}>Outro endereço</span>

                    <span className="viagem-solic-cep">CEP:</span>
                    <input value={cepOri} disabled={!novoEnderecoOrigem} type="text" className="via-inp-cep" onChange={handleCepOriChange} />

                    <span className="viagem-solic-logra">Logradouro:</span>
                    <input value={lograOri} disabled={!novoEnderecoOrigem} type="text" className="via-inp-logra" placeholder={!novoEnderecoOrigem ? lograOri : ""} onChange={handleLograOriChange} />

                    <span className="viagem-solic-bairro">Bairro:</span>
                    <input value={bairroOri} disabled={!novoEnderecoOrigem} type="text" className="via-inp-bairro" placeholder={!novoEnderecoOrigem ? bairroOri : ""} onChange={handleBairroOriChange} />

                    <span className="viagem-solic-num">Nº:</span>
                    <input value={numOri} disabled={!novoEnderecoOrigem} type="text" className="via-inp-num" placeholder={!novoEnderecoOrigem ? numOri : ""} onChange={handleNumOriChange} />

                    <span className="viagem-solic-uf">UF:</span>
                    <select disabled={!novoEnderecoOrigem} className="sel-inp-uf" value={ufOri} onChange={handleUfOriChange}>
                        <option value={ufOri}>{ufOri}</option>
                    </select>

                    <span className="viagem-solic-cidade">Cidade:</span>
                    <select disabled={!novoEnderecoOrigem} className="sel-inp-cidade" value={cidadeOri} onChange={handleCidadeOriChange}>
                        <option value={cidadeOri}>{cidadeOri}</option>
                    </select>

                </div>


                <div className="viagem-ender-destino">

                    <span className="viagem-solic-endDest-title">Endereço de Destino</span>

                    <input id="radio-empresa-ender" checked={!novoEnderecoDestino} type="radio" onChange={handleRadioEmpresaDestChange} />
                    <span className="viagem-solic-emp-end" onClick={handleRadioEmpresaDestClick}>Endereço da empresa</span>

                    <input id="radio-outro-ender" checked={novoEnderecoDestino} type="radio" onChange={handleRadioOutroDestChange} />
                    <span className="viagem-solic-outro-end" onClick={handleRadioOutroDestClick}>Outro endereço</span>

                    <span className="viagem-solic-cep">CEP:</span>
                    <input value={cepDest} disabled={!novoEnderecoDestino} type="text" className="via-inp-cep" onChange={handleCepDestChange} />

                    <span className="viagem-solic-logra">Logradouro:</span>
                    <input value={lograDest} disabled={!novoEnderecoDestino} type="text" className="via-inp-logra" placeholder={!novoEnderecoDestino ? lograDest : ""} onChange={handleLograDestChange} />

                    <span className="viagem-solic-bairro">Bairro:</span>
                    <input value={bairroDest} disabled={!novoEnderecoDestino} type="text" className="via-inp-bairro" placeholder={!novoEnderecoDestino ? bairroDest : ""} onChange={handleBairroDestChange} />

                    <span className="viagem-solic-num">Nº:</span>
                    <input value={numDest} disabled={!novoEnderecoDestino} type="text" className="via-inp-num" placeholder={!novoEnderecoDestino ? numDest : ""} onChange={handleNumDestChange} />

                    <span className="viagem-solic-uf">UF:</span>
                    <select disabled={!novoEnderecoDestino} className="sel-inp-uf" value={ufDest} onChange={handleUfDestChange}>
                        <option value={ufDest}>{ufDest}</option>
                    </select>

                    <span className="viagem-solic-cidade">Cidade:</span>
                    <select disabled={!novoEnderecoDestino} className="sel-inp-cidade" onChange={handleCidadeDestChange}>
                        <option value={cidadeDest}>{cidadeDest}</option>
                    </select>

                </div>

                <button name="submit" id="btn-efet-solic" onClick={handleEfetuarSoliClick}>Efetuar Solicitação</button>
                <button id="btn-sair-solic" onClick={handleSairSolClick}>Fechar</button>

            </form>

        </div>
    );

}

export default ViagemGridCreate