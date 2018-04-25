import React,{Component} from 'react';

import Order from '../../components/Order/Order';

class Orders extends Component {

    render(){

        return(
            [<Order />,<Order />]
            
        );

    }

}

export default Orders;