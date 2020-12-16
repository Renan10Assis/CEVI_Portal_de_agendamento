import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { Viagem } from "../../store/ducks/types/Viagem";
import "./styles.css";


const EstatViagemBlock = () => {

    const dadosViagens = useSelector((state:AppState)=>state.viagens);
    const listaStatus = useSelector((state:AppState)=>state.viagemStatus);
    

    const [aguardando, setAguardando] = useState<Viagem[]>([]);
    const [confirmado, setConfirmado] = useState<Viagem[]>([]);
    const [concluido, setConcluido] = useState<Viagem[]>([]);
    const [cancelado, setCancelado] = useState<Viagem[]>([]);
    const [total, setTotal] = useState<number>(0);


    useEffect(()=>{

        setAguardando(dadosViagens.filter(({ via_status}) => via_status === listaStatus.aguardando));
        setConfirmado(dadosViagens.filter(({ via_status}) => via_status === listaStatus.confirmado));
        setConcluido(dadosViagens.filter(({ via_status}) => via_status === listaStatus.concluido));
        setCancelado(dadosViagens.filter(({ via_status}) => via_status === listaStatus.cancelado));
        
        setTotal(aguardando.length+confirmado.length+concluido.length);
    },[dadosViagens]);

    return (
        <div id="estat-container">
            <div className="estat-secao">

                <span className="estat-title">Estatísticas de viagens</span>


                <span className="estat-rotulo-label">Aguardando confirmação:</span>
                <span className="estat-label">{aguardando.length}</span>

                <span className="estat-rotulo-label">Confirmado:</span>
                <span className="estat-label">{confirmado.length}</span>

                <span className="estat-rotulo-label">Concluido:</span>
                <span className="estat-label">{concluido.length}</span>

                <span className="estat-rotulo-label">Cancelado:</span>
                <span className="estat-label">{cancelado.length}</span>

                <span className="estat-rotulo-label">Total:</span>
                <span className="estat-label">{total}</span>

            </div>
        </div>
    );
}

export default EstatViagemBlock;