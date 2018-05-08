import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    ingredientsPrice: null,
    error: false,
};

const reducer = (state = initialState, action) => {

    let updated_state = null;

    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:

            updated_state = {
                ...state,
                ingredients: { ...state.ingredients },
                totalPrice: (parseFloat(Number(state.totalPrice) + Number(state.ingredientsPrice[action.payload.ingredientType]))).toFixed(2),
            };

            console.log('[ADD_INGREDIENT]', action, updated_state);


            updated_state.ingredients[action.payload.ingredientType] = updated_state.ingredients[action.payload.ingredientType] + 1;

            return updated_state;
        case actionsTypes.REMOVE_INGREDIENT:

            updated_state = {
                ...state,
                ingredients: { ...state.ingredients },
                totalPrice: (parseFloat(Number(state.totalPrice) - Number(state.ingredientsPrice[action.payload.ingredientType]))).toFixed(2),
            };

            updated_state.ingredients[action.payload.ingredientType] = updated_state.ingredients[action.payload.ingredientType] - 1;

            return updated_state;

        case actionsTypes.SET_INGREDIENTS:

            updated_state = {
                ...state,
                ingredients: action.payload.ingredients,
            };

            return updated_state;

        case actionsTypes.SET_INGREDIENTS_PRICE:

            updated_state = {
                ...state,
                ingredientsPrice: action.payload.ingredientsPrice,
                error:false, // in case we h've a error earlier
            };
            return updated_state;

        case actionsTypes.FETCH_INGREDIENTS_FAILED:

            updated_state = {
                ...state,
                error: true,
            };
            return updated_state;
        default:
            return state;

    }
}

export default reducer;