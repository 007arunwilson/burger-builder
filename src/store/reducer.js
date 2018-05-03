import * as actions from './actions';

const intitialState = {
    ingredients: null,
    totalPrice: 0,
};

const reducer = (state = intitialState, action) => {

    let updated_state = null;

    switch (action.type) {
        case actions.ADD_INGREDIENT:

            updated_state = {
                ...state,
                ...state.ingredients
            };

            updated_state.ingredients[action.payload.ingredient] = updated_state.ingredients[action.payload.ingredient] + 1;

            break;
        case actions.REMOVE_INGREDIENT:

            updated_state = {
                ...state,
                ...state.ingredients
            };

            updated_state.ingredients[action.payload.ingredient] = updated_state.ingredients[action.payload.ingredient] - 1;

            break;

        default:
            return state;

    }
}

export default reducer;