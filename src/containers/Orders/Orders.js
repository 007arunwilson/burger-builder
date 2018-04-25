import React, { Component, Fragment } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';
import WithAxiosErrorHandler from '../../hoc/WithAxiosErrorHandler/WithAxiosErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {

        axiosInstance.get('/orders.json')
            .then(res => {

                let firebase_orders = res.data;
                let orders = [];

                for (let key in firebase_orders) {

                    orders.push({
                        ...firebase_orders[key],
                        id: key
                    })

                }

                this.setState({ orders: orders, loading: false });

            });

    }

    render() {

        let orders_jsx = <Spinner />;

        if (!this.state.loading) {

            orders_jsx = (<Fragment>
                {this.state.orders.map(order=><Order
                 key={order.id} 
                 ingredients={order.ingredients}
                 price={order.price}
                 />)}
                </Fragment>);

        }

        return(
            <div>
                {orders_jsx}
                </div>
                );
        
            }
        
        }
        
export default Orders;