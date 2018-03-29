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

    addIngredientHandler = (ingredientType) =>{

        let newState = {...this.state};
        let oldIngredientValue = newState.ingredients[ingredientType];
        let newIngredientValue = oldIngredientValue + 1;
        newState.ingredients[ingredientType] = newIngredientValue;
        this.setState(newState);

    };

    removeIngredientHandler = (ingredientType) =>{

        let newState = {...this.state};
        let oldIngredientValue = newState.ingredients[ingredientType];

        if(oldIngredientValue<=0) return;

        let newIngredientValue = oldIngredientValue - 1;
        

        newState.ingredients[ingredientType] = newIngredientValue;
        this.setState(newState);

    };

    render(){

        const disabledBtnInfo = {...this.state.ingredients};

        for(let key in disabledBtnInfo)
        {
            disabledBtnInfo[key]  = disabledBtnInfo[key]>0?false:true;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls  
                addIngredientFn={this.addIngredientHandler} 
                removeIngredientFn={this.removeIngredientHandler}
                disabledBtnInfo={disabledBtnInfo}
                />
            </Aux>
        )

    }

}

export default BurgerBuilder;