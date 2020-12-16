import React, { MouseEvent, ChangeEvent, useEffect, useState, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { FiCheck, FiEdit, FiArrowUpCircle } from 'react-icons/fi';
import api from '../../services/api';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { Empresa } from '../../store/ducks/types/Empresa';
import { startUpdateEmpresa } from '../../store/ducks/actions/Empresa';



const EmporistaGridEdit = () => {



    const dispatch = useDispatch();
    const empresaState = useSelector((state: AppState) => state.empresas);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const listaStatus = useSelector((state: AppState) => state.viagemStatus);
    const authUserState = useSelector((state: AppState) => state.authUsuarios);
    const [editData, setEditData] = useState<boolean>(false);
    const [nomeEmp, setNomeEmp] = useState<string>("");
    const [enderEmp, setEnderEmp] = useState<string>("");
    const [msg, setMsg] = useState<string>("");


    const [initialEmp, setInitialEmp] = useState<Empresa>({
        emp_id: "",
        emp_nomeFantasia: "",
        emp_cnpj: "",
        emp_endereco: ""       

    });


    useEffect(() => {
        empresaState.map(emp => {
            if (emp.emp_id === navigationState.empresaIDClicked) {
                setInitialEmp(emp);
                setNomeEmp(emp.emp_nomeFantasia);
                setEnderEmp(emp.emp_endereco);
                
            }

            return null;
        });

    }, [navigationState.empresaIDClicked]);



    function handleNomeChange(action: ChangeEvent<HTMLInputElement>) {
        setNomeEmp(action.target.value);
    }

    function handleEnderecoChange(action: ChangeEvent<HTMLInputElement>) {
        setEnderEmp(action.target.value);
    }

    



    function handleRetrairClick(action: MouseEvent<HTMLDivElement>) {
        if (editData) {
            alert("Salve as alterações antes de fechar!");
        } else {

            let newNavState = navigationState;
            newNavState.empresaIDClicked = "";
            setMsg("");
            dispatch(startSetNavigation(newNavState));
        }
    }


    const handleUpdateData = (action: MouseEvent<SVGElement>) => {

        action.preventDefault();

        try {


            const empData = {
                emp_id: initialEmp.emp_id,
                emp_nomeFantasia: nomeEmp,
                emp_endereco:enderEmp
            }


            document.getElementById("msgEmpStatus")?.setAttribute("style", "color:white");
            setMsg("Atualizando empresa...");

            api.put("/empresas", (empData)).then(res => {

                if (!res.data.erro) {
                    document.getElementById("msgEmpStatus")?.setAttribute("style", "color:darkgreen");
                    setInitialEmp(res.data);
                    dispatch(startUpdateEmpresa(initialEmp));
                    setMsg("Alteração bem sucedida!");
                    setEditData(false);
                }
            }).catch(err => {
                document.getElementById("msgEmpStatus")?.setAttribute("style", "color:yellow");
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

            <form action="submit" className={navigationState.empresaIDClicked ? "grid-emp-edit" : "grid-emp-edit-hidden"}>

                <div className="secaoEmpDados">
                    <span className="empresa-title-lbl">Dados do empresa</span>

                    <span className="edit-empresa-rotulo">Nome do empresa:</span>
                    <span className={editData ? "edit-empresa-data-hidden" : "edit-empresa-nome"}>{initialEmp.emp_nomeFantasia}</span>
                    <input type="text" className={!editData ? "edit-empresa-data-hidden" : "edit-empresa-inp"} placeholder={initialEmp.emp_nomeFantasia} onChange={handleNomeChange} />

                    <span className="edit-empresa-rotulo">CNPJ:</span>
                    <span className="edit-empresa-cnpj">{initialEmp.emp_cnpj}</span>

                    <span className="edit-empresa-rotulo">Endereço:</span>
                    <span className={editData ? "edit-empresa-data-hidden" : "edit-empresa-ender"}>{initialEmp.emp_endereco}</span>
                    <input className={!editData ? "edit-empresa-data-hidden" : "edit-empresa-inp"} placeholder={initialEmp.emp_endereco} onChange={handleEnderecoChange} />

                    

                </div>

                <div className="secaoEmpButtons">
                    <span id="msgEmpStatus">{msg}</span>
                    <FiCheck name="submit" id="icon-emp-confirm" visibility={authUserState.user.usu_tipo === "Administrador" && editData && navigationState.empresaIDClicked ? "visible" : "hidden"} onClick={handleUpdateData} />
                    <FiEdit id="icon-emp-edit" visibility={authUserState.user.usu_tipo === "Administrador" && !editData && navigationState.empresaIDClicked ? "visible" : "hidden"} onClick={() => setEditData(true)} />
                </div>

                <div className="secaoEmpRetrair" onClick={handleRetrairClick}><FiArrowUpCircle />Fechar</div>
            </form>
        </div>
    );

}

export default memo(EmporistaGridEdit);
