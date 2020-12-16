import React from 'react';
import {  useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { IsAuthenticated } from './IsAuthenticated';
import Home from './pages/Home';
import Main from './pages/Main';
import CadastroUsuario from './pages/CadastroUsuario';
import { AppState } from './store';
import CadastroMotorista from './pages/CadastroMotorista';
import CadastroEmpresa from './pages/CadastroEmpresa';

const PrivateRoute = ({ ...rest }) => {
    IsAuthenticated();
    const userState = useSelector((state: AppState) => state.authUsuarios);
    return (
        userState.isLogged ? <Route element={<Main />} /> : <Navigate to="/" />
    );
}

const PrivateRoute2 = ({ ...rest }) => {
    IsAuthenticated();
    const userState = useSelector((state: AppState) => state.authUsuarios);
    return (
        userState.isLogged && userState.user.usu_tipo.toLowerCase()==="administrador" ? <Route element={<CadastroUsuario/>} /> : <Navigate to="/" />
    );
}
const PrivateRoute3 = ({ ...rest }) => {
    IsAuthenticated();
    const userState = useSelector((state: AppState) => state.authUsuarios);
    return (
        userState.isLogged && userState.user.usu_tipo.toLowerCase()==="administrador" ? <Route element={<CadastroMotorista/>} /> : <Navigate to="/" />
    );
}

const PrivateRoute4 = ({ ...rest }) => {
    IsAuthenticated();
    const userState = useSelector((state: AppState) => state.authUsuarios);
    return (
        userState.isLogged && userState.user.usu_tipo.toLowerCase()==="administrador" ? <Route element={<CadastroEmpresa/>} /> : <Navigate to="/" />
    );
}

const MainRoutes = () => {
    
    
    return (
        <Router>
            <Routes>

                <Route path="/">
                    <Home />
                </Route>

                <PrivateRoute path="/main" />
                <PrivateRoute2 path="/cadastros-usuarios" />
                <PrivateRoute3 path="/cadastros-motoristas" />
                <PrivateRoute4 path="/cadastros-empresas" />

                <Route path="/*" element={
                    <div>
                        <h2>Error 404!</h2>
                        <h3>Ops! Page not found</h3>
                    </div>}>
                </Route>

            </Routes>
        </Router>
    );
}

export default MainRoutes;