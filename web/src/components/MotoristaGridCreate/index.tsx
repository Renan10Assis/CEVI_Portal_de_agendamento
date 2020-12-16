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
import { Motorista } from "../../store/ducks/types/Motorista";
import { uuid } from 'uuidv4';
import { startCreateMotorista } from "../../store/ducks/actions/Motorista";

/* mot_id,
            mot_nome,
            mot_sexo,
            mot_cpf,
            mot_nascimento,
            mot_telefone,
            mot_placa,
            mot_marca,
            mot_modelo,
            mot_anoModelo,
            mot_numeroViatura,
            mot_cor,
            mot_status
 */

const MotoristaGridCreate = () => {
    const dispatch = useDispatch();
    const navigationState = useSelector((state: AppState) => state.navigation);

    const [newMot, setNewMot] = useState<Motorista>({
        mot_anoModelo: "",
        mot_cor: "",
        mot_cpf: "",
        mot_id: "",
        mot_marca: "",
        mot_modelo: "",
        mot_nascimento: "",
        mot_nome: "",
        mot_numeroViatura: "",
        mot_placa: "",
        mot_sexo: "",
        mot_status: "",
        mot_telefone: "",

    });

    const [motNome, setNome] = useState<string>("");
    const [motSexo, setMotSexo] = useState<string>("");
    const [motCpf, setMotCPF] = useState<string>("");
    const [motNasc, setMotNasc] = useState<string>("");
    const [motTel, setMotTel] = useState<string>("");
    const [motPlaca, setMotPlaca] = useState<string>("");
    const [motMarca, setMotMarca] = useState<string>("");
    const [motModelo, setMotModelo] = useState<string>("");
    const [motAnoMod, setMotAnoMod] = useState<string>("");
    const [motCor, setMotCor] = useState<string>("");
    const [motNumVia, setMotNumVia] = useState<string>("");
    const [motStatus, setMotStatus] = useState<string>("");


    function handleNomeChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setNome(action.target.value);
    }

    function handleSexoChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        setMotSexo(action.target.value);
    }

    function handleCPFChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setMotCPF(action.target.value);
    }

    function handleNascChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setMotNasc(action.target.value);
    }

    function handleTelChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setMotTel(TelMask(action.target.value));
    }

    function handleMarcaChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setMotMarca(action.target.value);
    }

    function handleModeloChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setMotModelo(action.target.value);
    }

    function handleAnoChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        setMotAnoMod(action.target.value);
    }

    function handleCorChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setMotCor(action.target.value);
    }

    function handlePlacaChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setMotPlaca(action.target.value);
    }

    function handleViaturaChange(action: ChangeEvent<HTMLInputElement>) {
        action.preventDefault();
        setMotNumVia(action.target.value);
    }

    function handleStatusChange(action: ChangeEvent<HTMLSelectElement>) {
        action.preventDefault();
        setMotStatus(action.target.value);
    }


    function handleEfetuarCadastroClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();

        if (!motAnoMod || !motCor || !motCpf || !motMarca || !motModelo || !motNasc || !motNome || !motNumVia || !motPlaca || !motSexo || !motStatus || !motTel) {
            return alert("Preencha todos os campos!");
        }

        const id = uuid();
        let motData: Motorista = {
            mot_anoModelo: motAnoMod,
            mot_cor: motCor,
            mot_cpf: motCpf,
            mot_modelo: motModelo,
            mot_id: id,
            mot_marca: motMarca,
            mot_nascimento: motNasc,
            mot_nome: motNome,
            mot_numeroViatura: motNumVia,
            mot_placa: motPlaca,
            mot_sexo: motSexo,
            mot_status: motStatus,
            mot_telefone: motTel
        }


        try {

            api.post('/motoristas', ((motData))).then(res => {
                setNewMot(res.data);
                dispatch(startCreateMotorista(newMot));

            }).catch(err => console.log(err));

        } catch (err) {
            console.log(err);
        }

    }


    function handleCadastrarClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.cadastrarMotClicked = true;
        dispatch(startSetNavigation(newNavState));
    }


    function handleSairCadClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        let newNavState = navigationState;
        newNavState.cadastrarMotClicked = false;
        dispatch(startSetNavigation(newNavState));
    }


    return (
        <div className="mot-create-container">

            <span className="solicitar-label">Cadastre um motorista</span>
            <button className="btn-solicitar" onClick={handleCadastrarClick}>Cadastrar</button>

            <form action="submit" className={navigationState.cadastrarMotClicked ? "mot-cadastro-div-visible" : "mot-cadastro-div-hidden"}>

                <span className="motorista-solic-title">Cadastro de motorista</span>

                <div className="motorista-dados">
                    <span className="motorista-cad-nome">Nome do Motorista:</span>
                    <input type="text" className="mot-cad-inp-nome" onChange={handleNomeChange} />

                    <span className="motorista-cad-tel">Telefone:</span>
                    <input value={motTel} type="text" className="mot-cad-inp-tel" onChange={handleTelChange} />

                    <span className="motorista-cad-ano">CPF:</span>
                    <input type="text" className="mot-cad-inp-tel" onChange={handleCPFChange} />


                    <span className="motorista-cad-sexo">Sexo:</span>
                    <select className="mot-sel-sexo" onChange={handleSexoChange}>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outros">Outros</option>
                    </select>

                    <span className="motorista-cad-nasc">Nascimento:</span>
                    <input type="text" className="mot-inp-nasc" onChange={handleNascChange} />

                    <span className="motorista-cad-sexo">Status:</span>
                    <select className="mot-sel-sexo" onChange={handleStatusChange}>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>

                </div>

                <span className="divisoriaViagem"></span>

                <div className="motorista-veiculo">

                    <span className="motorista-cad-marca">Marca:</span>
                    <input type="text" className="mot-cad-inp-marca" onChange={handleMarcaChange} />

                    <span className="motorista-cad-mod">Modelo:</span>
                    <input type="text" className="mot-cad-inp-mod" onChange={handleModeloChange} />

                    <span className="motorista-cad-ano">Ano:</span>
                    <select className="mot-sel-ano" onChange={handleAnoChange}>
                        <option value=""></option>
                    </select>

                    <span className="motorista-cad-cor">Cor:</span>
                    <input type="text" className="mot-cad-inp-cor" onChange={handleCorChange} />

                    <span className="motorista-cad-tel">Placa:</span>
                    <input type="text" className="mot-cad-inp-placa" onChange={handlePlacaChange}/>

                    <span className="motorista-cad-viat">Número da Viatura:</span>
                    <input type="text" className="mot-cad-inp-viat" onChange={handleViaturaChange}/>


                </div>


                <button id="btn-sair-mot-cad" onClick={handleSairCadClick}>X</button>
                <button name="submit" id="btn-efet-mot-cad" onClick={handleEfetuarCadastroClick}>Efetuar Cadastro</button>

            </form>



        </div>

    );

}

export default MotoristaGridCreate;