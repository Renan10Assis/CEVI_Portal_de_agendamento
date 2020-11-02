import React, { FormEvent, useState, ChangeEvent, useCallback, memo } from 'react';
import api from '../../services/api';
import './styles.css';
import { useDispatch } from 'react-redux';
import { startAuthUsuario, startLogoutUsuario } from '../../store/ducks/actions/AuthUsuario';
import { Link } from 'react-router-dom';


const InputLogin = () => {
    const dispatch = useDispatch();

    const [usuEmail, setUsuEmail] = useState<string>("");
    const [usuSenha, setUsuSenha] = useState<string>("");
    const [respMsg, setRespMsg] = useState<string>("");

    

    const handleSubmit = useCallback((action: FormEvent<HTMLFormElement>) => {
        action.preventDefault();
        document.getElementById("msg-erro")?.setAttribute("style", "color:#ddd")

        if (usuEmail === "" || usuSenha ==="") { 
            setRespMsg("Preencha os campos em branco!");
            document.getElementById("msg-erro")?.setAttribute("style","color:red")

        } 
        
        else {
            setRespMsg("Aguarde...");
            api.post('/usuarios/auth', ({ usu_email: usuEmail, usu_senha: usuSenha })).then(res => {

                setRespMsg("Autenticando...");
                setTimeout(() => {

                    if (typeof res.data == typeof {}) {
                        dispatch(startAuthUsuario(res.data));
                        setRespMsg("Autenticado com sucesso");
                        document.getElementById("msg-erro")?.setAttribute("style", "color:#00a500")

                    } else {
                        dispatch(startLogoutUsuario())
                        document.getElementById("msg-erro")?.setAttribute("style", "color:red")
                        setRespMsg(res.data);

                    }
                }, 2000);
            });
        }
    }, [{ usuEmail, usuSenha }]);


    const handleUsuEmailChange = useCallback((action: ChangeEvent<HTMLInputElement>) => {
        setUsuEmail(action.target.value);

    }, [usuEmail]);

    const handleUsuSenhaChange = useCallback((action: ChangeEvent<HTMLInputElement>) => {
        setUsuSenha(action.target.value);

    }, [usuSenha]);


    return (
        <div id="content">
            <span id="msg-erro">{respMsg}</span>
            <form onSubmit={handleSubmit}>
                <input placeholder="Digite seu E-mail" className="input-login" onChange={handleUsuEmailChange} type="text" />
                <label htmlFor="login-email" className="label-login">Digite seu E-mail</label>
                <input placeholder="Digite sua senha" className="input-login" type="password" onChange={handleUsuSenhaChange} />
                <label htmlFor="login-senha" className="label-login">Digite sua Senha</label>
                <button name="submit">Entrar</button>

            </form>
            <div id="esqueci-senha">
                <Link to="">
                    <span id="recuperar">
                        Esqueci a senha
                    </span>
                </Link>
            </div>
            <div id="cadastro-container">
                <span>
                    Novo por aqui? Solicite seu cadastro<> </>
                    <a href="https://ceviapp.com.br/contato/" target="_blank">
                        <span id="link-agora">agora</span>
                    </a>
                </span>
            </div>

        </div>

    );

}

export default memo(InputLogin);