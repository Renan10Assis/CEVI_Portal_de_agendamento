import React from 'react';
//import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
//import { AppState } from './store';



const MainRoutes = () => {
    return (
        <Router>
            <Routes>

                <Route path="/">
                    <Home />
                </Route>

                <Route path="/main">
                    <Main />
                </Route>

                <Route path="*">
                    <div>404 - Not Found</div>
                </Route>

            </Routes>
        </Router>
    );
}

export default MainRoutes;