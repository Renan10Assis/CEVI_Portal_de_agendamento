import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import InputLogin from '../../components/InputLogin';
import { AppState } from '../../store/index';
import home_image2 from '../../assets/home_image2.jpg';

const Home = () => {
    const authUserState = useSelector((state: AppState) => state.authUsuarios);

    const redirecionar = () => {
        let gif = document.createElement("div");
        gif.setAttribute("style", "width:30%; height:5vh;background:#ccc");
        setTimeout(() => {
            if (authUserState.usu_id !== "") {
                window.location.replace("/Main")
            }
        }, 2000);
    }

    return (
        <div id="container">
            {redirecionar()}

            <div id="left-container">
                <div id="logo-container">
                    <h1>CEVI</h1>
                    <h2>Portal de Agendamento</h2>
                </div>

                <div id="input-container" >
                    <InputLogin />
                </div>

            </div>

            <div id="right-container">
                <img src={home_image2} alt="imagem home" />
            </div>

        </div>



    );

}

export default Home;