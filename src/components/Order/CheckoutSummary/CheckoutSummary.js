import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {

    return (
        <div className={classes.checkoutSummary} >
            <h1>Hope It tastes well!</h1>
            <div style={{width:'100%',margin:'auto'}} >
                <Burger ingredients={props.ingredients}  />
            </div>
            
            <Button btnType="Danger" clicked={props.oncheckoutcancel.bind(this)}  >Cancel</Button>
            <Button btnType="Success" clicked={props.oncheckoutcontinue.bind(this)} >Continue</Button>

        </div>

    );

}

export default checkoutSummary;