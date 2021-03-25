import React, { MouseEvent, ChangeEvent, useEffect, useState, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import api from '../../services/api';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { Empresa } from '../../store/ducks/types/Empresa';
import profile_image from "../../assets/profile_image.jpg";
import { startUpdateUsuario } from '../../store/ducks/actions/Usuario';
import {v4} from "uuid";



const UsuarioGridEdit = () => {


    const dispatch = useDispatch();
    const empresaState = useSelector((state: AppState) => state.empresas);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const listaStatus = useSelector((state: AppState) => state.viagemStatus);
    const [userEmpOption, setUserEmpOption] = useState<string>("");
    const [userStatusOption, setUserStatusOption] = useState<string>("");
    const [tipoUserOption, setTipoUserOption] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userSenha, setUserSenha] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [bloquearInserir, setBloquearInserir] = useState<boolean>(true);


    const [initialEmpState, setInitialEmpState] = useState<Empresa>({
        emp_id: "",
        emp_cnpj: "",
        emp_endereco: "",
        emp_nomeFantasia: ""

    });

    useEffect(()=>{
        if(userName && userEmail && userSenha && tipoUserOption && userStatusOption && userEmpOption){
            setBloquearInserir(false);
        }else{
            setBloquearInserir(true);
        }
    },[userName,userEmail,userSenha,tipoUserOption,userStatusOption,userEmpOption]);

    useEffect(() => {
        if (userEmpOption) {
            empresaState.map(empresa => {
                if (empresa.emp_id === userEmpOption) {
                    setInitialEmpState(empresa);
                }

                return null;
            });
        } else {
            setInitialEmpState({
                emp_id:"",
                emp_cnpj:"",
                emp_endereco:"",
                emp_nomeFantasia:""
            });
        }
    }, [userEmpOption]);



    function handleUserNameChange(action: ChangeEvent<HTMLInputElement>) {
        setUserName(action.target.value);
    }
    function handleUserEmailChange(action: ChangeEvent<HTMLInputElement>) {
        setUserEmail(action.target.value);
    }
    function handleUserSenhaChange(action: ChangeEvent<HTMLInputElement>) {
        setUserSenha(action.target.value);
    }

    function handleEmpresaOptionChange(action: ChangeEvent<HTMLSelectElement>) {
        setUserEmpOption(action.target.value);
    }

    function handleStatusOptionChange(action: ChangeEvent<HTMLSelectElement>) {
        setUserStatusOption(action.target.value);
    }

    function handleTipoUserOptionChange(action: ChangeEvent<HTMLSelectElement>) {
        setTipoUserOption(action.target.value);
    }


    function handleFecharClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();

        let newNavState = navigationState;
        newNavState.novoUsuClicked = false;
        setMsg("");
        dispatch(startSetNavigation(newNavState));

    }


    const handleCreateData = (action: MouseEvent<HTMLButtonElement>) => {

        action.preventDefault();

        try {

            const novoID = v4();
            console.log(novoID);
            const userData = {
                usu_id: novoID,
                usu_nome: userName,
                usu_email: userEmail,
                usu_senha: userSenha,
                usu_emp_id: userEmpOption,
                usu_tipo: tipoUserOption,
                usu_status: userStatusOption
            }

            document.getElementById("msgUsuStatus")?.setAttribute("style", "color:darkblue");
            setMsg("Criando usuário...");


            api.post("/usuarios", (userData)).then(res => {

                if (!res.data.erro) {
                    document.getElementById("msgUsuStatus")?.setAttribute("style", "color:darkgreen");
                    let dados = res.data;
                    dispatch(startUpdateUsuario(dados));
                    setMsg("Usuário criado com sucesso!");
                }else{
                    document.getElementById("msgUsuStatus")?.setAttribute("style", "color:red");
                    setMsg(res.data.erro);
                }
            }).catch(err => {
                document.getElementById("msgUsuStatus")?.setAttribute("style", "color:yellow");
                setMsg("Falha na comunicação com servidor!");
                return console.log(err)
            });

        } catch (err) {
            console.log(err);
            setMsg("Erro interno!");
        }


    }



    return (
        <div id="grid-create-usuario-container">

            <img className="create-usu-imagem" src={profile_image} />
            <form action="submit" className="grid-user-create">
                <h2 id="novo-usu-title">Criar novo usuário</h2>
                <div className="secaoUsuDadosCreate">

                    <span className="create-usu-rotulo">Nome de usuário:</span>
                    <input type="text" className="create-usuario-dados" onChange={handleUserNameChange} />
                </div>

                <div className="secaoUsuDadosCreate">
                    <span className="create-usu-rotulo">Email:</span>
                    <input type="email" className="create-usuario-dados" onChange={handleUserEmailChange} />
                </div>
                <div className="secaoUsuDadosCreate">
                    <span className="create-usu-rotulo">Senha:</span>
                    <input type="password" className="create-usuario-dados" onChange={handleUserSenhaChange} />
                </div>

                <div className="secaoUsuDadosCreate">

                    <span className="create-usu-rotulo">Tipo de usuário:</span>
                    <select className="create-sel-usuario-dados" onChange={handleTipoUserOptionChange}>
                        <option value="">Selecione o tipo de usuário...</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Operador">Operador</option>
                        <option value="Cliente">Cliente</option>

                    </select>

                </div>

                <div className="secaoUsuDadosCreate">

                    <span className="create-usu-rotulo">Status:</span>
                    <select className="create-sel-usuario-dados" onChange={handleStatusOptionChange}>
                        <option value="">Selecione o status do usuario...</option>
                        <option value={listaStatus.ativo}>{listaStatus.ativo}</option>
                        <option value={listaStatus.inativo}>{listaStatus.inativo}</option>

                    </select>
                </div>


                <span id="divisoria-create-usuario"></span>

                <div className="secaoUsuDadosCreate">

                    <span className="create-usu-rotulo">Empresa:</span>
                    <select className="create-usuario-dados" onChange={handleEmpresaOptionChange}>
                        <option value="">Selecione uma empresa...</option>
                        {empresaState.map(empresa => {
                            return <option key={empresa.emp_id} value={empresa.emp_id}>{empresa.emp_nomeFantasia}</option>
                        }
                        )}

                    </select>
                </div>

                <div className="secaoUsuDadosCreate">
                    <span className="create-usu-rotulo">CNPJ:</span>
                    <span className="create-usuario-dados">{initialEmpState.emp_cnpj}</span>
                </div>

                <div className="secaoUsuDadosCreate">

                    <span className="create-usu-rotulo">Endereço da empresa:</span>
                    <span className="create-usuario-dados">{initialEmpState.emp_endereco}</span>
                    <span id="msgUsuStatus">{msg}</span>
                </div>

                <button disabled={bloquearInserir} name="submit" className={bloquearInserir?"btn-usu-create-disabled":"btn-usu-create-salvar"} onClick={handleCreateData}>Criar usuário</button>
                <button  className="btn-usu-create-fechar" onClick={handleFecharClick}>Fechar</button>

            </form>
        </div>
    );

}

export default memo(UsuarioGridEdit);
