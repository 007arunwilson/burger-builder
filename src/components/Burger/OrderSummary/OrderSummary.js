import React from 'react';
import Aux from '../../../hoc/Aux';

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
        </Aux>
    );

}

export default OrderSummary;