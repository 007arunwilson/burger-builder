import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    checkoutOutContinue() {
        this.props.history.push('/checkout/contact-data');
        //this.props.histoy.back();
        //this.props.histoy.push('/checkout/contact-data');
    }

    checkoutOutCancel() {
        this.props.history.goBack();
        //this.props.history.back();
    }

    render() {

        return (
            <div>
                <CheckoutSummary
                    oncheckoutcontinue={this.checkoutOutContinue.bind(this)}
                    oncheckoutcancel={this.checkoutOutCancel.bind(this)}
                    ingredients={this.props.ingredients} />

                <Route path={this.props.match.url + '/contact-data'} component={ContactData} />


            </div>
        );

    }

}


const mapStateToProps = (reduxState) => {
    return {
        ingredients: reduxState.ingredients,
        totalPrice: reduxState.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);