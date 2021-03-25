import React, { MouseEvent, ChangeEvent, useEffect, useState, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { FiCheck, FiEdit, FiArrowUpCircle } from 'react-icons/fi';
import api from '../../services/api';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { Usuario } from '../../store/ducks/types/Usuario';
import { Empresa } from '../../store/ducks/types/Empresa';
import profile_image from "../../assets/profile_image.jpg";
import { startUpdateUsuario } from '../../store/ducks/actions/Usuario';



const UsuarioGridEdit = () => {



    const dispatch = useDispatch();
    const empresaState = useSelector((state: AppState) => state.empresas);
    const usuarioState = useSelector((state: AppState) => state.usuarios);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const [editData, setEditData] = useState<boolean>(false);
    const [userEmpOption, setUserEmpOption] = useState<string>("");
    const [userStatusOption, setUserStatusOption] = useState<string>("");
    const [tipoUserOption, setTipoUserOption] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const listaStatus = useSelector((state: AppState) => state.viagemStatus);
    const [msg, setMsg] = useState<string>("");
    const authUserState = useSelector((state: AppState) => state.authUsuarios);

    const [initialUser, setInitialUser] = useState<Usuario>({
        usu_id: "",
        usu_nome: "",
        usu_email: "",
        usu_emp_id: "",
        usu_imagem: "",
        usu_senha: "",
        usu_status: "",
        usu_tipo: ""

    });

    const initialEmpState: Empresa = {
        emp_id: "",
        emp_cnpj: "",
        emp_endereco: "",
        emp_nomeFantasia: ""

    }

    const [userEmp, setUserEmp] = useState<Empresa>(initialEmpState);



    useEffect(() => {
        usuarioState.map(user => {
            if (user.usu_id === navigationState.usuarioIDClicked) {
                setInitialUser(user);
                setUserEmpOption(user.usu_emp_id);
                setTipoUserOption(user.usu_tipo);
                setUserStatusOption(user.usu_status);
                setUserName(user.usu_nome);
            }

            return null;
        });

    }, [navigationState.usuarioIDClicked]);




    useEffect(() => {
        if (userEmpOption) {
            empresaState.map(empresa => {
                if (empresa.emp_id === userEmpOption) {
                    return setUserEmp(empresa);

                }
            });
        } else {
            return setUserEmp(initialEmpState);
        }
    }, [userEmpOption]);



    function handleUserNameChange(action: ChangeEvent<HTMLInputElement>) {
        setUserName(action.target.value);
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


    function handleEditarClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        setEditData(true);
    }



    function handleFecharClick(action: MouseEvent<HTMLButtonElement>) {
        action.preventDefault();
        if (editData) {
            alert("Salve as alterações antes de fechar!");
        } else {

            let newNavState = navigationState;
            newNavState.usuarioIDClicked = "";
            setMsg("");
            dispatch(startSetNavigation(newNavState));
        }
    }


    const handleUpdateData = (action: MouseEvent<HTMLButtonElement>) => {

        action.preventDefault();

        try {


            const userData = {
                usu_id: initialUser.usu_id,
                usu_nome: userName,
                usu_emp_id: userEmpOption,
                usu_tipo: tipoUserOption,
                usu_status: userStatusOption
            }

            document.getElementById("msgStatus")?.setAttribute("style", "color:white");
            setMsg("Atualizando usuário...");


            api.put("/usuarios", (userData)).then(res => {

                if (!res.data.erro) {
                    document.getElementById("msgStatus")?.setAttribute("style", "color:darkgreen");
                    setInitialUser(res.data);
                    dispatch(startUpdateUsuario(initialUser));
                    setMsg("Alteração bem sucedida!");
                    setEditData(false);
                }
            }).catch(err => {
                document.getElementById("msgStatus")?.setAttribute("style", "color:yellow");
                setMsg("Falha na comunicação com servidor!");
                return console.log(err)
            });

        } catch (err) {
            console.log(err);
            setMsg("Erro interno!");
        }


    }



    return (
        <div id="grid-usuario-container">

            <img className="edit-usu-imagem" src={initialUser.usu_imagem ? initialUser.usu_imagem : profile_image} />
            <form action="submit" className="grid-user-edit">

                <div className="secaoUsuDados">

                    <span className="edit-usu-rotulo">Nome de usuário:</span>
                    {!editData ? <span className="edit-usuario-dados">{initialUser.usu_nome}</span> : null}
                    {editData ? <input type="text" className="edit-usuario-dados" placeholder={initialUser.usu_nome} onChange={handleUserNameChange} /> : null}
                </div>

                <div className="secaoUsuDados">
                    <span className="edit-usu-rotulo">Email:</span>
                    <span className="edit-usuario-dados">{initialUser.usu_email}</span>
                </div>

                <div className="secaoUsuDados">

                    <span className="edit-usu-rotulo">Tipo de usuário:</span>
                    {!editData ? <span className="edit-usuario-dados">{initialUser.usu_tipo}</span> : null}
                    {authUserState.user.usu_tipo === "Administrador" && editData ? <select value={tipoUserOption} className="edit-sel-usuario-dados" onChange={handleTipoUserOptionChange}>
                        <option value="Administrador">Administrador</option>
                        <option value="Operador">Operador</option>
                        <option value="Cliente">Cliente</option>

                    </select> : null}

                </div>

                <div className="secaoUsuDados">

                    <span className="edit-usu-rotulo">Status:</span>
                    {!editData ? <span className="edit-usuario-dados">{initialUser.usu_status}</span> : null}
                    {authUserState.user.usu_tipo === "Administrador" && editData ? <select value={userStatusOption} className="edit-sel-usuario-dados" onChange={handleStatusOptionChange}>
                        <option value={listaStatus.ativo}>{listaStatus.ativo}</option>
                        <option value={listaStatus.inativo}>{listaStatus.inativo}</option>

                    </select> : null}
                </div>


                <span id="divisoria-edit-usuario"></span>

                <div className="secaoUsuDados">

                    <span className="edit-usu-rotulo">Empresa:</span>
                    {!editData ? <span className="edit-usuario-dados">{userEmp.emp_nomeFantasia}</span> : null}
                    {authUserState.user.usu_tipo.toLowerCase() === "administrador" && editData ? <select id="escolha" className="edit-usuario-dados" onChange={handleEmpresaOptionChange}>
                        {empresaState.map(empresa => {
                            return <option key={empresa.emp_id} value={empresa.emp_id}>{empresa.emp_nomeFantasia}</option>
                        }
                        )}

                    </select> : null}
                </div>

                <div className="secaoUsuDados">
                    <span className="edit-usu-rotulo">CNPJ:</span>
                    <span className="edit-usuario-dados">{userEmp.emp_cnpj}</span>
                </div>

                <div className="secaoUsuDados">

                    <span className="edit-usu-rotulo">Endereço da empresa:</span>
                    <span className="edit-usuario-dados">{userEmp.emp_endereco}</span>
                    <span id="msgUsuStatus">{msg}</span>
                </div>


                <button className="btn-usu-edit-editar" onClick={handleEditarClick}>Editar</button>
                <button name="submit" className="btn-usu-edit-salvar" onClick={handleUpdateData}>Salvar</button>
                <button className="btn-usu-edit-fechar" onClick={handleFecharClick}>Fechar</button>

            </form>
        </div>
    );

}

export default memo(UsuarioGridEdit);
