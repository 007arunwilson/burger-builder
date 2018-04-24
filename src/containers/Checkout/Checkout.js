import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients:{}
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

    componentDidMount(){
        
        let stateIngredients = {};

        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            console.log(param); // yields ['start', '5']
            stateIngredients[param[0]] = parseInt(param[1]);

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

                <Route path={this.props.match.url+'/contact-data'} component={ContactData} />


            </div>
        );

    }
    
}


export default Checkout;