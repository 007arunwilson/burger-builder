import * as actions from './actions';

const initialState = {
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0,
    },
    totalPrice:0,
    ingredientsPrice:{
        salad:.5,
        bacon:.7,
        cheese:.8,
        meat:1.8,
    }
};

const reducer = (state = initialState, action) => {

    let updated_state = null;

    switch (action.type) {
        case actions.ADD_INGREDIENT:

            updated_state = {
                ...state,
                ingredients:{...state.ingredients},
                totalPrice:state.totalPrice+state.ingredientsPrice[action.payload.ingredientType],
            };

            console.log('[ADD_INGREDIENT]',action, updated_state);


            updated_state.ingredients[action.payload.ingredientType] = updated_state.ingredients[action.payload.ingredientType] + 1;

            return updated_state;
        case actions.REMOVE_INGREDIENT:

            updated_state = {
                ...state,
                ingredients:{...state.ingredients},
                totalPrice:state.totalPrice-state.ingredientsPrice[action.payload.ingredientType],
            };

            updated_state.ingredients[action.payload.ingredientType] = updated_state.ingredients[action.payload.ingredientType] - 1;

            return updated_state;
        default:
            return state;

    }
}

export default reducer;