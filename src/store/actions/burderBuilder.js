import * as actionTypes from './actionTypes';

export const addBurgerIngredient = (payload) => {

    return {
        type:actionTypes.ADD_INGREDIENT,
        payload:payload
    }

}

export const removeBurgerIngredient = (payload) => {

    return {
        type:actionTypes.REMOVE_INGREDIENT,
        payload:payload
    }

}