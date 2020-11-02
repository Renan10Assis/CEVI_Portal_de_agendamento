import React, { useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import { useDispatch } from 'react-redux';



const Header = () => {
    const dispatch = useDispatch();


    return (
        <h1>Cabeçalho</h1>
    );

}

export default Header;