import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import togglerImage from '../../../assets/images/toggle.png';

const Toolbar = (props) =>(

    <header className={classes.Toolbar} >
        <div className={classes.MobileOnly} >
            <a href="javascript:;" onClick={props.openSideDrawer} className={classes.togglerImageLink} >
                <img src={togglerImage} />
                <span style={{color:'#000',fontSize:12}} >Menu</span>
            </a>
        </div>
        <Logo/>
        <nav className={classes.DesktopOnly} >
            <NavigationItems/>
        </nav>
    </header>

);

export default Toolbar;