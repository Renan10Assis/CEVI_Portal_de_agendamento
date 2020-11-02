import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import Main from './pages/Main';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Main} path="/main" exact />
        </BrowserRouter>
    );
}

export default Routes;