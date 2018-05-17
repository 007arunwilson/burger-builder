import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const purchaseBurgerSuccess = (payload) => {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderid: payload.id,
            orderData: payload.orderData
        }
    }

}

export const purchaseBurgerFail = (payload) => {

    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: {
            error:payload.error
        }
    }

}

export const purchaseBurgerStart = () => {

    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }

}

export const sentBurgerOrder = (payload) => {

    return (dispatch,getState)=>{

        dispatch(purchaseBurgerStart());

        let order = {
            ingredients: payload.ingredients,
            price: payload.totalPrice,
            orderData:payload.orderData
        }
        

        axiosInstance.post('/orders.json', order)
            .then(response => {

                //Dummy payload
                let payload = {
                    orderid: 2323,
                    orderData: order.orderData
                }

                return dispatch(purchaseBurgerSuccess(payload));
                
            })
            .catch(error => {

                return dispatch(purchaseBurgerFail({
                    payload:error
                }));

            })

    }

}