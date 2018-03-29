import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
]

const BuildControls = (props)=>(
    <div className={classes.BuildControls} >
    <p> Current Price : <strong>{props.totalPrice}</strong> $</p>
    {controls.map(cntrl=>
        <BuildControl 
        key={cntrl.label}
        label={cntrl.label}
        removed={()=>props.removeIngredientFn(cntrl.type)}
        added={()=>props.addIngredientFn(cntrl.type)}
        disabled={props.disabledBtnInfo[cntrl.type]}
         />
    )}
    </div>
);

export default BuildControls;