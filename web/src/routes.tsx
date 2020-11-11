import React from 'react';
import {  useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { IsAuthenticated } from './IsAuthenticated';
import Home from './pages/Home';
import Main from './pages/Main';
import { AppState } from './store';

const PrivateRoute = ({ ...rest }) => {
    IsAuthenticated();
    const userState = useSelector((state: AppState) => state.authUsuarios);
    return (
        userState.isLogged ? <Route element={<Main />} /> : <Navigate to="/" />
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