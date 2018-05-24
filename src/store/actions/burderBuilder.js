import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const addBurgerIngredient = (payload) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: payload
    }

}

export const removeBurgerIngredient = (payload) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: payload
    }

}


// Internal Caller Function
export const setIngredients = (payload) => {

    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: payload,
    }

}

// Internal Caller Function
export const setIngredientsPrice = (payload) => {

    return {
        type: actionTypes.SET_INGREDIENTS_PRICE,
        payload: payload,
    }

}

// Internal Caller Function
export const fetchIngredientsFailed = () => {

    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }

}

export const resetBurgerPrice = (payload={price:0}) => {

    return {
        type: actionTypes.RESET_BURGER_PRICE,
        payload:payload
    }

}


export const initIngredients = () => {

    return (dispatch, getState) => {

        axiosInstance.get('https://cis-burger-builder-react.firebaseio.com/ingredients_priced.json')
            .then(response => {

                const ingredients_priced_response = response.data;

                const ingredients_keys = Object.keys(ingredients_priced_response);
                let ingredients = {};
                let ingredients_price = {};

                ingredients_keys.map(ingkey => {

                    ingredients[ingkey] = ingredients_priced_response[ingkey]['initial_value'];
                    ingredients_price[ingkey] = ingredients_priced_response[ingkey]['price'];

                });

                dispatch(setIngredientsPrice({
                    ingredientsPrice: ingredients_price
                }))

                dispatch(setIngredients({
                    ingredients: ingredients
                }))

            })
            .catch(error => {

                dispatch(fetchIngredientsFailed());
            })


        const ingredients = null;

        return {
            type: actionTypes.SET_INGREDIENTS,
            payload: { ingredients: ingredients }
        }

    }



}