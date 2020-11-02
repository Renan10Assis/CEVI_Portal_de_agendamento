import React, { useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import { useDispatch } from 'react-redux';



const Footer = () => {
    const dispatch = useDispatch();


    return (
        <h1>Rodapé</h1>
    );

}

export default Footer;