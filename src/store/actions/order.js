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

export const purchaseBurgerStart = (payload) => {

    return (dispatch,getState)=>{

        console.log('[purchaseBurgerStart] action response',getState);

        let order = {
            ingredients: getState().ingredients,
            price: getState().totalPrice,
            orderData:payload.orderData
        }

        axiosInstance.post('/orders.json', order)
            .then(response => {

                console.log('[purchaseBurgerStart] action response : ',response)

                //Dummy payload
                let payload = {
                    orderid: 2323,
                    orderData: order.orderData
                }

                return dispatch(purchaseBurgerSuccess(payload));
                
            })
            .catch(error => {
                this.setState({ loading: false });
            })

    }

}