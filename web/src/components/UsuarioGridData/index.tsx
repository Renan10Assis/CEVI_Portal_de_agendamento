import React, { MouseEvent, useEffect, useState, memo } from 'react';
import { AppState } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { startSetNavigation } from '../../store/ducks/actions/Navigation';
import { Usuario } from '../../store/ducks/types/Usuario';
import { Empresa } from '../../store/ducks/types/Empresa';
import profile_image from '../../assets/profile_image.jpg'; 




const UsuarioGridData: React.FC<Usuario> = (props) => {
    const usuariosState = useSelector((state: AppState) => state.usuarios);
    const empresasState = useSelector((state: AppState) => state.empresas);
    const navigationState = useSelector((state: AppState) => state.navigation);
    const dispatch = useDispatch();

    const usuarioProp: Usuario = props;


    const [empresa, setEmpresa] = useState<Empresa>();


    useEffect(() => {

        empresasState.map(empresa => {
            if (empresa.emp_id === usuarioProp.usu_emp_id) {
                setEmpresa(empresa);
            }

        });
    }, [usuariosState]);


    function handleViewUserDetails(action: MouseEvent<HTMLDivElement>) {
        let newNavState = navigationState;
        newNavState.usuarioIDClicked = usuarioProp.usu_id;
        dispatch(startSetNavigation(newNavState));
    }



    return (
        <div id="grid-user-container">


            <div className={navigationState.usuarioIDClicked ? "grid-user-read-hidden" : "grid-user-read"} onClick={handleViewUserDetails}>

                <img className="rotulo_usu_imagem" src={usuarioProp.usu_imagem?usuarioProp.usu_imagem:profile_image}/>
                <span className="rotulo_usu_nome">{usuarioProp.usu_nome}</span>
                <span className="rotulo_usu_empresa">{empresa?.emp_nomeFantasia}</span>
                <span className="rotulo_usu_email">{usuarioProp.usu_email}</span>
                <span className="rotulo_usu_tipo">{usuarioProp.usu_tipo}</span>
                <span className="rotulo_usu_status">{usuarioProp.usu_status}</span>

            </div>

        </div>
    );

}

export default memo(UsuarioGridData);
