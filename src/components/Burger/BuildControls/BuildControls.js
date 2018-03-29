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
    {controls.map(cntrl=>
        <BuildControl key={cntrl.label} label={cntrl.label} />
    )}
    </div>
);

export default BuildControls;