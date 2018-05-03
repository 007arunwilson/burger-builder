import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
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
        totalPrice: 0,
        purchasable: false,
        purchaseMode: false,
        error: null
    }

    IngredientPrice = null;

    componentDidMount() {

        console.log('[BurgerBuilder]', this.props)

        // axiosInstance.get('https://cis-burger-builder-react.firebaseio.com/ingredients_priced.json')
        // .then(response=>{

        //     const ingredients_priced_response = response.data;

        //     const ingredients_keys = Object.keys(ingredients_priced_response);
        //     let ingredients = {};
        //     let ingredients_price = {};

        //     ingredients_keys.map(ingkey=>{

        //         ingredients[ingkey] = ingredients_priced_response[ingkey]['initial_value'];
        //         ingredients_price[ingkey] = ingredients_priced_response[ingkey]['price'];

        //     });

        //     this.IngredientPrice = ingredients_price
        //     this.setState({ingredients:ingredients});
        //     this.updatePurchasePrice(ingredients);

        // })
        // .catch(error=>{

        //     this.setState({error:error});

        // })

    }

    updatePurchasableValue = (ingredients) => {

        let purchasableValue = Object.keys(ingredients)
            .map((key_) => ingredients[key_])
            .reduce((prev, cur) => {
                return prev + cur;
            }, 0);

        this.setState({ purchasable: purchasableValue > 0 })

    }

    updatePurchasePrice(currentIngredients) {

        let current_price = 0;

        let ingredientKeys = Object.keys(currentIngredients);

        ingredientKeys.map(ingkey => {
            current_price += (currentIngredients[ingkey] * this.IngredientPrice[ingkey]);
        });

        current_price = parseFloat(current_price).toFixed(2);

        this.updatePurchasableValue(currentIngredients);
        this.setState({ totalPrice: current_price });


    }

    addIngredientHandler = (ingredientType) => {

        console.log('[addIngredientHandler] :', ingredientType);

        let newState = { ...this.state };

        console.log(' Satte Ingredients : ', newState.ingredients);
        let oldIngredientValue = newState.ingredients[ingredientType];
        let newIngredientValue = oldIngredientValue + 1;
        newState.ingredients[ingredientType] = newIngredientValue;

        this.setState(newState);
        this.updatePurchasePrice(newState.ingredients);
    };

    removeIngredientHandler = (ingredientType) => {

        let newState = { ...this.state };
        let oldIngredientValue = newState.ingredients[ingredientType];

        if (oldIngredientValue <= 0) return;

        let newIngredientValue = oldIngredientValue - 1;

        newState.ingredients[ingredientType] = newIngredientValue;
        this.setState(newState);
        this.updatePurchasePrice(newState.ingredients);

    };

    purchaseModeHandler = () => {
        this.setState({ purchaseMode: true });
    }

    purchaseModeOffHandler = () => {
        this.setState({ purchaseMode: false });
    }

    purchaseContinueHandler = () => {
        console.log(this.props);

        let burgerIngredients = this.props.ingredients;

        let queryParamsArr = new Array();

        queryParamsArr.push('totalPrice=' + this.props.totalPrice);

        for (let i in burgerIngredients) {

            queryParamsArr.push(encodeURIComponent(i) + '=' + encodeURIComponent(burgerIngredients[i]));

        }

        const queryString = queryParamsArr.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });

    }

    render() {

        const disabledBtnInfo = { ...this.props.ingredients };

        for (let key in disabledBtnInfo) {
            disabledBtnInfo[key] = disabledBtnInfo[key] > 0 ? false : true;
        }

        let burgerBuilder = <Spinner />

        if (this.props.ingredients) {

            let orderSummary = <OrderSummary
                purchaseCancelHandler={this.purchaseModeOffHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
            />;

            if (this.state.loadiing) {
                orderSummary = <Spinner />;
            }

            burgerBuilder = <Fragment>
                <Burger ingredients={this.props.ingredients} />
                <Modal
                    open={this.state.purchaseMode}
                    closeHandler={this.purchaseModeOffHandler} >
                    {orderSummary}
                </Modal>
                <BuildControls
                    addIngredientFn={this.props.addIngredientHandler}
                    removeIngredientFn={this.props.removeIngredientHandler}
                    disabledBtnInfo={disabledBtnInfo}
                    totalPrice={this.props.totalPrice}
                    purchasable={this.state.purchasable}
                    purchaseModeHandler={this.purchaseModeHandler}
                />
            </Fragment>;

        }

        return (
            <Aux>
                {this.state.error ? (
                    <p style={{ textAlign: 'Center', color: 'red' }}>
                        Something went wrong!
                <br />
                        The application can't loaded
                </p>
                ) : burgerBuilder}
            </Aux>
        )

    }

}

const mapStateToProps = (reduxState) => {
    return {
        ingredients: reduxState.ingredients,
        totalPrice: reduxState.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientType) => {
            return dispatch({
                type: actions.ADD_INGREDIENT,
                payload: {
                    ingredientType: ingredientType
                }
            });
        },
        removeIngredientHandler: (ingredientType) => {
            return dispatch({
                type: actions.REMOVE_INGREDIENT,
                payload: {
                    ingredientType: ingredientType
                }
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAxiosErrorHandler(BurgerBuilder, axiosInstance));