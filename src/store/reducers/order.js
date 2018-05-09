import * as actionTypes from '../actions/actionTypes';

const initial_state = {
    orders: [],
    loading: false,
};

const reducer = (state = initial_state, action) => {

    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:

            const newOrderData = {
                ...action.payload.orderData,
                id:action.payload.orderId
            }

            return {
                ...state,
                loading:false,
                orders:state.orders.concat(newOrderData)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading:false
            };

    }

};

export default reducer;