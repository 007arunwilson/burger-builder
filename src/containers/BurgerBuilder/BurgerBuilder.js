import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithAxiosErrorHandler from '../../hoc/WithAxiosErrorHandler/WithAxiosErrorHandler';

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
        purchaseMode:false,
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

    purchaseModeHandler = () => {
        this.setState({purchaseMode:true});
    }

    purchaseModeOffHandler = () => {
        this.setState({purchaseMode:false});
    }

    purchaseContinueHandler = () => {
        //console.log('Purchase Continue : ',true);
        this.setState({loadiing:true});

        const order = {
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customner:{
                name:'Arun Wilson',
                addres:{
                    street:'lorem Streets',
                    zipcode:'58654',
                    country:'Canada',
                },
                email:'cyberinfoscripter@gmail.com'
            },
            deliveryMethod:'fastest'
        }
        axiosInstance.post('/orders',order)
        .then(response=>{
            this.setState({loadiing:false,purchaseMode:false});
        })
        .catch(error=>{
            this.setState({loadiing:false,purchaseMode:false});
        })


    }

    render(){

        const disabledBtnInfo = {...this.state.ingredients};

        for(let key in disabledBtnInfo)
        {
            disabledBtnInfo[key]  = disabledBtnInfo[key]>0?false:true;
        }

        let orderSummary = <OrderSummary 
                            purchaseCancelHandler = {this.purchaseModeOffHandler}
                            purchaseContinueHandler = {this.purchaseContinueHandler}
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            />;

        if(this.state.loadiing) orderSummary = <Spinner/>;

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                    <Modal 
                    open={this.state.purchaseMode} 
                    closeHandler={this.purchaseModeOffHandler} >
                        {orderSummary}
                    </Modal>
                <BuildControls  
                addIngredientFn={this.addIngredientHandler} 
                removeIngredientFn={this.removeIngredientHandler}
                disabledBtnInfo={disabledBtnInfo}
                totalPrice={this.state.totalPrice}
                purchasable = {this.state.purchasable}
                purchaseModeHandler = {this.purchaseModeHandler}
                />
            </Aux>
        )

    }

}

export default WithAxiosErrorHandler(BurgerBuilder,axiosInstance);