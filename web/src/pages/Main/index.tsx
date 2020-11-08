import React, {useEffect} from 'react';
import './styles.css';
/* import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/index'; */
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { useNavigate } from 'react-router-dom';

const Main = () => {

    const authState = useSelector((state:AppState)=>state.authUsuarios);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!authState.isLogged){
            console.log(localStorage.getItem("auth_user"));
           alert("Você foi desconectado! Sessão expirou!");
           navigate("/");
        }

    });


    return (
        <div id="container">
            <header id="main-header">
                <Header />
            </header>

            <div id="menu-container">

            </div>

            <main id="main-main">

            </main>

            <div id="painel-container">

            </div>

            <footer id="main-footer">

            </footer>



        </div>

    );

}

export default Main;


