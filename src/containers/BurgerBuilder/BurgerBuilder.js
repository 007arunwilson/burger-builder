import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {


    state = {
        ingredients:{
            salad:2,
            bacon:3,
            cheese:2,
            meat:1,
        }
    }

    render(){

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Aux>
        )

    }

}

export default BurgerBuilder;