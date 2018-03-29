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
        purchasable:false,
    }

    IngredientPrice = {
        salad:.5,
        bacon:.7,
        cheese:.8,
        meat:1.8,
    }

    updatePurchasableValue = (ingredients)=>{

        let purchasableValue = Object.keys(ingredients)
                                .map((key_)=>ingredients[key_])
                                .reduce((prev,cur)=>{
                                    return prev+cur;
                                },0);

        this.setState({purchasable:purchasableValue>0})

    }

    addIngredientHandler = (ingredientType) =>{

        let newState = {...this.state};
        let oldIngredientValue = newState.ingredients[ingredientType];
        let newIngredientValue = oldIngredientValue + 1;
        newState.ingredients[ingredientType] = newIngredientValue;
        newState.totalPrice = (parseFloat(newState.totalPrice)+this.IngredientPrice[ingredientType]).toFixed(2);

        this.setState(newState);
        this.updatePurchasableValue( newState.ingredients);

    };

    removeIngredientHandler = (ingredientType) =>{

        let newState = {...this.state};
        let oldIngredientValue = newState.ingredients[ingredientType];

        if(oldIngredientValue<=0) return;

        let newIngredientValue = oldIngredientValue - 1;

        newState.ingredients[ingredientType] = newIngredientValue;
        newState.totalPrice = (parseFloat(newState.totalPrice)-this.IngredientPrice[ingredientType]).toFixed(2);
        this.setState(newState);
        this.updatePurchasableValue(newState.ingredients);

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
                purchasable = {this.state.purchasable}
                />
            </Aux>
        )

    }

}

export default BurgerBuilder;