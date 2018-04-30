import React from 'react';

import classes from './Input.css';

const input = (props) => {

    let input_jsx;

    const InputElementClasses = [classes.InputElement];

    if(props.IsInValid && props.ShouldValidate && props.touched) InputElementClasses.push(classes.Invalid);

    switch(props.elementType)
    {

        case('input'):

            input_jsx = (<input
                 value={props.value}
                 onChange={props.onChangeHandler}
                 className={InputElementClasses.join(' ')} 
                 {...props.elementConfig} />);

        break;
        case('textarea'):

            input_jsx = (<textarea
                 value={props.value}
                 onChange={props.onChangeHandler}
                 className={InputElementClasses.join(' ')} 
                 {...props.elementConfig} />);

        break;
        case('select'):

            input_jsx = (<select
                 value={props.value}
                 onChange={props.onChangeHandler}
                 className={InputElementClasses.join(' ')} 
                 {...props.elementConfig.config} >
                 {props.elementConfig.options.map(option=>{

                    return (
                        <option key={option.value} value={option.value} >{option.displayValue}</option>
                    )
                
                 })}
                 </select>);

        break;
        default:

            input_jsx = (<input
                 value={props.value}
                 onChange={props.onChangeHandler}
                 className={InputElementClasses.join(' ')}  
                 {...props.elementConfig} />);

        break;
    }

    let validation_error = null;

    if(props.IsInValid && props.ShouldValidate && props.touched)
    {
        validation_error = <span className={classes.ErrorText} >Please add a valid {props.elementConfig.type?props.elementConfig.type:'text'}</span>;
    }

    return (<div className={classes.Input} >
        <label className={classes.Label} >{props.label}</label>
        {input_jsx}
        {validation_error}
    </div>);


}

export default input;