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


    function handleRetrairClick(action: MouseEvent<HTMLDivElement>) {
        if (editData) {
            alert("Salve as alterações antes de fechar!");
        } else {

            let newNavState = navigationState;
            newNavState.usuarioIDClicked = "";
            setMsg("");
            dispatch(startSetNavigation(newNavState));
        }
    }


    const handleUpdateData = (action: MouseEvent<SVGElement>) => {

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
        <div id="grid-container">

            <form action="submit" className={navigationState.usuarioIDClicked ? "grid-user-edit" : "grid-user-edit-hidden"}>
                <div className="secaoFoto">
                    <img className="edit-usu-imagem" src={initialUser.usu_imagem ? initialUser.usu_imagem : profile_image} />
                </div>

                <div className="secaoUsuDados">

                    <span className="edit-usu-rotulo">Nome de usuário</span>
                    <span className={editData ? "edit-usunome-hidden" : "edit-usunome"}>{initialUser.usu_nome}</span>
                    <input type="text" className={!editData ? "edit-usunome-hidden" : "edit-usunome"} placeholder={initialUser.usu_nome} onChange={handleUserNameChange} />

                    <span className="edit-usu-rotulo">Email</span>
                    <span className="edit-usu-email">{initialUser.usu_email}</span>


                    <span className="edit-usu-rotulo">Tipo de usuário</span>
                    <span className={editData ? "tipo-user-select-hidden" : "edit-usu-tipo"}>{initialUser.usu_tipo}</span>
                    <select value={tipoUserOption} disabled={editData ? false : true} className={authUserState.user.usu_tipo === "Administrador" && editData ? "tipo-user-select" : "tipo-user-select-hidden"} onChange={handleTipoUserOptionChange}>
                        <option value="Administrador">Administrador</option>
                        <option value="Operador">Operador</option>
                        <option value="Cliente">Cliente</option>

                    </select>

                    <span className="edit-usu-rotulo">Status</span>
                    <span className={editData ? "usu-status-select-hidden" : "edit-usu-status"}>{initialUser.usu_status}</span>
                    <select value={userStatusOption} disabled={editData ? false : true} className={authUserState.user.usu_tipo === "Administrador" && editData ? "usu-status-select" : "usu-status-select-hidden"} onChange={handleStatusOptionChange}>
                        <option value={listaStatus.ativo}>{listaStatus.ativo}</option>
                        <option value={listaStatus.inativo}>{listaStatus.inativo}</option>

                    </select>
                </div>
                <span className="divisoria-usu"></span>

                <div className="secaoUsuEmpDados">

                    <span className="edit-usu-rotulo">Empresa</span>
                    <span className={editData?"usu-emp-select-hidden":"usu-emp-label-data"}>{userEmp.emp_nomeFantasia}</span>
                    <select id="escolha" disabled={editData ? false : true} className={authUserState.user.usu_tipo.toLowerCase() === "administrador" && editData? "usu-emp-select" : "usu-emp-select-hidden"} onChange={handleEmpresaOptionChange}>
                        {empresaState.map(empresa => {
                            return <option key={empresa.emp_id} value={empresa.emp_id}>{empresa.emp_nomeFantasia}</option>
                        }
                        )}

                    </select>

                    <span className="edit-usu-rotulo">CNPJ:</span>
                    <span className="usu-emp-label-data">{userEmp.emp_cnpj}</span>

                    <span className="edit-usu-rotulo">Endereço da empresa:</span>
                    <span className="usu-emp-label-data">{userEmp.emp_endereco}</span>


                </div>

                <div className="secaoUsuButtons">
                    <span id="msgUsuStatus">{msg}</span>
                    <FiCheck name="submit" id="icon-usu-confirm" visibility={authUserState.user.usu_tipo === "Administrador" && editData && navigationState.usuarioIDClicked ? "visible" : "hidden"} onClick={handleUpdateData} />
                    <FiEdit id="icon-usu-edit" visibility={authUserState.user.usu_tipo === "Administrador" && !editData && navigationState.usuarioIDClicked ? "visible" : "hidden"} onClick={() => setEditData(true)} />
                </div>

                <div className="secaoUsuRetrair" onClick={handleRetrairClick}><FiArrowUpCircle />Fechar</div>
            </form>
        </div>
    );

}

export default memo(UsuarioGridEdit);
