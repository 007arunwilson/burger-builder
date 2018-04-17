import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate(){

        console.log('[OrderSummary] will update .... ');

    }

    render(){

        const  ingredients = this.props.ingredients;
        const ingredientsSummary = Object.keys(ingredients).map((ingKey,i)=>(
            <li key={ingKey+i}><span>{ingKey}</span> : {ingredients[ingKey]}</li>
        ));

        return (
            <Aux>
                <h3>Order Summary</h3>
                <p>A Delicious Burger with following Ingredients :</p>
                {ingredientsSummary}
                <p><strong>Total Price : {this.props.totalPrice}$</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}  >Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinueHandler}  >Purchase</Button>
            </Aux>
        );


    }

}

export default OrderSummary;