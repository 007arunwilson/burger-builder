import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
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

        return purchasableValue > 0;

    }

    purchaseModeHandler = () => {
        this.setState({ purchaseMode: true });
    }

    purchaseModeOffHandler = () => {
        this.setState({ purchaseMode: false });
    }

    purchaseContinueHandler = () => {

        this.props.history.push('/checkout');

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
                    purchasable={this.updatePurchasableValue(this.props.ingredients)}
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
            return dispatch(burgerBuilderActions.addBurgerIngredient({ingredientType: ingredientType}));
        },
        removeIngredientHandler: (ingredientType) => {
            return dispatch(burgerBuilderActions.removeBurgerIngredient({ingredientType: ingredientType}));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAxiosErrorHandler(BurgerBuilder, axiosInstance));