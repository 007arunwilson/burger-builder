import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients:{},
        totalPrice:null
    }

    checkoutOutContinue(){
        this.props.history.push('/checkout/contact-data');
        //this.props.histoy.back();
        //this.props.histoy.push('/checkout/contact-data');
    }

    checkoutOutCancel(){
        this.props.history.goBack();
        //this.props.history.back();
    }

    componentWillMount(){
        
        let stateIngredients = {};

        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            console.log(param); // yields ['start', '5']

            if(param[0] == 'totalPrice')
            {
                this.setState({totalPrice:param[1]})

            }else stateIngredients[param[0]] = parseInt(param[1]);

        }

        this.setState({ingredients:stateIngredients});
    }

    render(){

        return(
            <div>
                <CheckoutSummary 
                oncheckoutcontinue={this.checkoutOutContinue.bind(this)}
                oncheckoutcancel={this.checkoutOutCancel.bind(this)}
                ingredients={this.state.ingredients} />

                <Route path={this.props.match.url+'/contact-data'} render={(props)=>{                    
                    return(<ContactData {...props} totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} />);
                }} />


            </div>
        );

    }
    
}


export default Checkout;