import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { Usuario } from "../../store/ducks/types/Usuario";
import "./styles.css";


const EstatUsuarioBloco = () => {

    const dadosUsuarios = useSelector((state:AppState)=>state.usuarios);
    const listaStatus = useSelector((state:AppState)=>state.viagemStatus);
    

    const [ativo, setAtivo] = useState<Usuario[]>([]);
    const [inativo, setInativo] = useState<Usuario[]>([]);

    const [total, setTotal] = useState<number>(0);


    useEffect(()=>{

        setAtivo(dadosUsuarios.filter(({ usu_status}) => usu_status === listaStatus.ativo));
        setInativo(dadosUsuarios.filter(({ usu_status}) => usu_status === listaStatus.inativo));

        
        setTotal(ativo.length+inativo.length);
    },[dadosUsuarios]);

    return (
        <div id="estat-usu-container">
            <div className="estat-usu-secao">

                <span className="estat-usu-title">Estatísticas de usuários</span>


                <span className="estat-usu-rotulo-label">Ativos:</span>
                <span className="estat-usu-label">{ativo.length}</span>

                <span className="estat-usu-rotulo-label">Inativos:</span>
                <span className="estat-usu-label">{inativo.length}</span>


                <span className="estat-usu-rotulo-label">Total:</span>
                <span className="estat-usu-label">{total}</span>

            </div>
        </div>
    );
}

export default EstatUsuarioBloco;