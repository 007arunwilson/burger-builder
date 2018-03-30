import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    const  ingredients = props.ingredients;
    const ingredientsSummary = Object.keys(ingredients).map((ingKey,i)=>(
        <li key={ingKey+i}><span>{ingKey}</span> : {ingredients[ingKey]}</li>
    ));

    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>A Delicious Burger with following Ingredients :</p>
            {ingredientsSummary}
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelHandler}  >Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinueHandler}  >Purchase</Button>
        </Aux>
    );

}

export default OrderSummary;