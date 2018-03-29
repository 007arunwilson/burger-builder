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
        totalPrice:0,
    }

    IngredientPrice = {
        salad:.5,
        bacon:.7,
        cheese:.8,
        meat:1.8,
    }

    addIngredientHandler = (ingredientType) =>{

        let newState = {...this.state};
        let oldIngredientValue = newState.ingredients[ingredientType];
        let newIngredientValue = oldIngredientValue + 1;
        newState.ingredients[ingredientType] = newIngredientValue;
        newState.totalPrice = (parseFloat(newState.totalPrice)+this.IngredientPrice[ingredientType]).toFixed(2);

        this.setState(newState);

    };

    removeIngredientHandler = (ingredientType) =>{

        let newState = {...this.state};
        let oldIngredientValue = newState.ingredients[ingredientType];

        if(oldIngredientValue<=0) return;

        let newIngredientValue = oldIngredientValue - 1;
        

        newState.ingredients[ingredientType] = newIngredientValue;
        newState.totalPrice = (parseFloat(newState.totalPrice)-this.IngredientPrice[ingredientType]).toFixed(2);
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
                totalPrice={this.state.totalPrice}
                />
            </Aux>
        )

    }

}

export default BurgerBuilder;