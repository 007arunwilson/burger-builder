import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {


    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
        },
        price:0,
    }

    addIngredient = (ingredientType) =>{

        let newState = {...this.state};
        let oldIngredientValue = newState.ingredients[ingredientType];
        let newIngredientValue = oldIngredientValue + 1;
        newState.ingredients[ingredientType] = newIngredientValue;
        this.setState(newState);

    };

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls  addIngredientFn={this.addIngredient} />
            </Aux>
        )

    }

}

export default BurgerBuilder;