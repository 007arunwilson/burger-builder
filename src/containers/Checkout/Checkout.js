import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
import * as orderActions from '../../store/actions/index';

class Checkout extends Component {
  checkoutOutContinue() {
    
    this.props.purchaseBurgerInit();
    this.props.history.push("/checkout/contact-data");

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
          ingredients={this.props.ingredients}
        />

        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    ingredients: reduxState.burgerBuilder.ingredients,
    totalPrice: reduxState.burgerBuilder.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurgerInit:()=>{
            return dispatch(orderActions.purchaseBurgerInit());
        }
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
