import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const SideDrawer = (props) =>{
    
    let side_drawer_classes = [classes.SideDrawer,classes.Close];
    
    if(props.isopen){
        side_drawer_classes = [classes.SideDrawer,classes.Open];
    }

    return(
        <Aux>
            <Backdrop closeClickHandler={props.closehandler} show={props.isopen} />
            <div className={side_drawer_classes.join(' ')} >
                <div style={{height:'10%',marginBottom:'32px'}} >
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );

}

export default SideDrawer;