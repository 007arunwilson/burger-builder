import React,{ Component, Fragment } from 'react';
import {connect} from 'react-redux';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosInstance from '../../../axios-orders';
import WithAxiosErrorHandler from '../../../hoc/WithAxiosErrorHandler/WithAxiosErrorHandler';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions/index';


class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                validation:{
                    required:true,
                    minLength:2,
                    maxLength:16
                },
                valid:false,
                touched:false
            },
            street: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                validation:{
                    required:true,
                    minLength:2,
                    maxLength:32
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code',
                },
                validation:{
                    required:true,
                    minLength:4,
                    maxLength:12
                },
                valid:false,
                touched:false
            },
            country: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'Country',
                },
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:32
                },
                valid:false,
                touched:false
            },
            email: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Mail',
                },
                validation:{
                    required:true,
                    minLength:4,
                    maxLength:46
                },
                valid:false,
                touched:false
            },
            delieveryMethod: {
                elementType:'select',
                valid:true,
                value:'cheapest',
                elementConfig:{
                    options:[{
                        value:'fastest',
                        displayValue:'Fastest',
                    },
                    {
                        value:'cheapest',
                        displayValue:'Cheapest',
                    }],
                    config:{}
                },
                validation:{}
            },
        },
        formIsValid:false,
        loading: false,
    }

    componentDidMount() {

        console.log('[ContactData] props ', this.props);
        
    }

    checkValidity(value,rules)
    {

        let isValid = true;

        if(!rules) return isValid;

        if(rules.required){
            isValid = (value.trim() !== '' && isValid);
        }

        if(rules.minLength)
        {
            isValid = (value.length >= rules.minLength && isValid);
        }

        if(rules.maxLength)
        {
            isValid = (value.length <= rules.maxLength && isValid);
        }

        return isValid;
    }

    inputChangeHandler(event,targetElementId){

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[targetElementId]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[targetElementId] = updatedFormElement;

        let formIsValid = true;

        for(let formIndentifier in updatedOrderForm)
        {

            formIsValid = (updatedOrderForm[formIndentifier].valid&&formIsValid)
        }

        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});

    }
    orderHandler(event) {

        event.preventDefault();

        this.setState({ loading: true })

        const orderData = {};
        for(let formElementIdenditifier in this.state.orderForm)
        {
            orderData[formElementIdenditifier] = this.state.orderForm[formElementIdenditifier]['value'];
        }

        let payload = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData:orderData
        }

        this.props.sentBurgerOrder(payload);


    }

    render() {

        // let contact_form_jsx = this.state.loading ? <Spinner/>:;
        const formElemetsArray = [];

        for (let key_ in this.state.orderForm)
        {
            formElemetsArray.push({
                id:key_,
                config:this.state.orderForm[key_],
            });
        }


        let input_jsx = formElemetsArray.map(formElement=>{
            return (<Input 
                key={formElement.id} 
                elementType={formElement.config.elementType} 
                value={formElement.config.value} 
                elementConfig={formElement.config.elementConfig}
                IsInValid={!formElement.config.valid}
                ShouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                onChangeHandler={(event)=>this.inputChangeHandler(event,formElement.id)}
                />);
        });

        let contact_form_jsx = (<Fragment>
            <h4>Enter your Contact data :</h4>
            <form onSubmit={this.orderHandler.bind(this)} >
                {input_jsx}
                <Button disabled={!this.state.formIsValid} >Order</Button>
            </form>
        </Fragment>);

        if (this.props.loading) {
            contact_form_jsx = <Spinner />
        }

        return (
            <div className={classes.ContactData} >
                {contact_form_jsx}
            </div>
        );

    }

}

const mapStateToProps = reduxState =>{
    return {
        ingredients:reduxState.burgerBuilder.ingredients,
        totalPrice:reduxState.burgerBuilder.totalPrice,
        loading:reduxState.order.loading,
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        sentBurgerOrder:(payload)=>{
            return dispatch(orderActions.sentBurgerOrder(payload));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithAxiosErrorHandler(ContactData, axiosInstance));