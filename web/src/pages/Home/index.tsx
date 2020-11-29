import React, { useEffect, memo } from 'react';
import './styles.css';
import InputLogin from '../../components/InputLogin';
import home_image2 from '../../assets/home_image2.jpg';
import home_image from '../../assets/home_image.jpg';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const authState = useSelector((state: AppState) => state.authUsuarios);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (authState.isLogged) {
            document.getElementById('container')?.setAttribute("style","cursor:none");
            setTimeout(() => {
                navigate("/main");
            }, 1000);
        } 
    });
    

    return (
        <div id="home-container">
            <div id="left-container">
                <div id="logo-container">
                    <h1 id="logo-lbl">CEVI</h1>
                    <h2 id="slogan-lbl">Portal de Agendamento</h2>
                </div>

                <div id="input-container" >
                    <InputLogin />
                </div>

            </div>

            <div id="right-container">
                <img id="image-home" src={home_image} alt="imagem home" />
            </div>

        </div>



    );

}

export default memo(Home);