import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const Modal = (props) => (
    
    <Aux>
       <Backdrop show={props.purchaseMode} closeClickHandler={props.purchaseModeOff} />
        <div 
        className={classes.Modal}
        style={{
            transform:props.purchaseMode==true?'translateY(0)':'translateY(-100vh)',
            opacity:props.purchaseMode==true?'1':'0'
        }}
        >
            {props.children}
        </div>
    </Aux>

);


export default Modal;
