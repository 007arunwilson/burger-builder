import React from 'react';

import classes from './Input.css';

const input = (props) => {

    let input_jsx;

    switch(props.inputtype)
    {

        case('input'):

            input_jsx = (<input className={classes.InputElement} {...props} />);

        break;
        case('textarea'):

            input_jsx = (<textarea className={classes.InputElement} {...props} />);

        break;



    }

    return (<div className={classes.Input} >
        <label className={classes.Label} >{props.label}</label>
        {input_jsx}
    </div>);


}

export default input;