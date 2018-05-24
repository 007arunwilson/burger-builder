import * as actionTypes from "../actions/actionTypes";

const initial_state = {
  orders: [],
  loading: false,
  purchasing:false,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrderData = {
        ...action.payload.orderData,
        id: action.payload.orderId
      };

      return {
        ...state,
        loading: false,
        purchasing:false,
        orders: state.orders.concat(newOrderData)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_INIT:

      return {
        ...state,
        purchasing: true
      };
    default:
      return { ...state };
  }
};

export default reducer;
