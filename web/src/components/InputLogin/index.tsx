import React, { FormEvent, useState, ChangeEvent, useCallback, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import { useDispatch } from 'react-redux';
import { startAuthUsuario } from '../../store/ducks/actions/AuthUsuario';
import { Link } from 'react-router-dom';
import { AuthUsuario } from "../../store/ducks/types/AuthUsuario";



const InputLogin = () => {

    const dispatch = useDispatch();
    const [usuEmail, setUsuEmail] = useState<string>("");
    const [usuSenha, setUsuSenha] = useState<string>("");
    const [respMsg, setRespMsg] = useState<string>("");

    let [authenticatedUser, setAuthenticatedUser] = useState<AuthUsuario>({
        token: "",
        isLogged: false,
        user: {
            usu_id: "",
            usu_nome: "",
            usu_email: "",
            usu_tipo: "",
            usu_imagem: "",
            emp_id: "",
            emp_nomeFantasia: ""
        }
    });

    useEffect(()=>{
        if (authenticatedUser.isLogged) {
            dispatch(startAuthUsuario(authenticatedUser));
        }
    });

    const handleSubmit = (action: FormEvent<HTMLFormElement>) => {
        action.preventDefault();
        document.getElementById("msg-erro")?.setAttribute("style", "color:#ddd")



        if (usuEmail === "" || usuSenha === "") {
            setRespMsg("Preencha os campos em branco!");
            document.getElementById("msg-erro")?.setAttribute("style", "color:red")

        }

        else {
            setRespMsg("Aguarde...");
            api.post('/usuarios/auth', ({ usu_email: usuEmail, usu_senha: usuSenha })).then(res => {

                setRespMsg("Autenticando...");
                setTimeout(() => {

                    if (res.data.user !== "") {
                        setAuthenticatedUser(res.data.data);
                        setRespMsg("Autenticado com sucesso");
                        document.getElementById("msg-erro")?.setAttribute("style", "color:#00a500");

                    } else {
                        document.getElementById("msg-erro")?.setAttribute("style", "color:red")
                        setRespMsg(res.data.mensagem);

                    }
                }, 2000);
            }).catch(err => {
                console.log(err);
                document.getElementById("msg-erro")?.setAttribute("style", "color:yellow")
                setRespMsg("Falha na comunicação cliente-servidor!");

            });


        }
    }


    const handleUsuEmailChange = useCallback((action: ChangeEvent<HTMLInputElement>) => {
        setUsuEmail(action.target.value);

    }, []);

    const handleUsuSenhaChange = useCallback((action: ChangeEvent<HTMLInputElement>) => {
        setUsuSenha(action.target.value);

    }, []);


    return (
        <div id="content">
            <span id="msg-erro">{respMsg}</span>
            <form onSubmit={handleSubmit}>
                <input placeholder="Digite seu E-mail" className="input-login" onChange={handleUsuEmailChange} type="text" />
                <label htmlFor="login-email" className="label-login">Digite seu E-mail</label>
                <input placeholder="Digite sua senha" className="input-login" type="password" onChange={handleUsuSenhaChange} />
                <label htmlFor="login-senha" className="label-login">Digite sua Senha</label>
                <button id="btn-entrar" name="submit">Entrar</button>

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
                    <a href="https://ceviapp.com.br/contato/" target="_blank" rel="noopener noreferrer">
                        <span id="link-agora">agora</span>
                    </a>
                </span>
            </div>

        </div>

    );

}

export default InputLogin;