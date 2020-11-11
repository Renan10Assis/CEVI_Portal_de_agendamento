import React,{MouseEvent, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {startSetNavigation} from "../../store/ducks/actions/Navigation";
import { AppState } from '../../store';
import './styles.css';
import { Navigation } from '../../store/ducks/types/Navigation';

export const UserOptions = () => {
    const dispatch = useDispatch();
    const navigationState = useSelector((state:AppState)=>state.navigation);
   
    console.log(navigationState);
    let navigation:Navigation={
        profileImageClicked: navigationState.profileImageClicked,
        profileLogoutClicked: navigationState.profileLogoutClicked,
        profilePreferencesClicked: navigationState.profilePreferencesClicked,
        profileMouseOver: false
    }

    function handleMouseLeave (action:MouseEvent<HTMLLIElement>){
        navigation.profileMouseOver = false;

        dispatch(startSetNavigation(navigation));
    }

    const handleMouseOver = (action:MouseEvent<HTMLLIElement>)=>{
        navigation.profileMouseOver = true;

        dispatch(startSetNavigation(navigation));
    }

    return (
        <div id="content-usu-opt">
            <ul className="ul-options">
                <li id={navigationState.profileMouseOver? "li-options-hover":"li-options"} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>Preferências</li>
                <li className="li-options">Sair</li>
            </ul>
        </div>

    );

}