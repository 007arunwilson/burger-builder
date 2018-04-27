import React, { Component, Fragment } from 'react';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosInstance from '../../../axios-orders';
import WithAxiosErrorHandler from '../../../hoc/WithAxiosErrorHandler/WithAxiosErrorHandler';
import Input from '../../../components/UI/Input/Input';


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
                    minLength:5,
                    maxLength:5
                },
                valid:false
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
                    minLength:5,
                    maxLength:5
                },
                valid:false
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
                    minLength:5,
                    maxLength:5
                },
                valid:false
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
                    minLength:5,
                    maxLength:5
                },
                valid:false
            },
            email: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Mail',
                },
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false
            },
            delieveryMethod: {
                elementType:'select',
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
                }
            }
        },
        loading: false,
    }

    componentDidMount() {

        console.log('[ContactData] props ', this.props);
        
    }

    checkValidity(value,rules)
    {

        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength)
        {
            isValid = value.length <= rules.minLength && isValid;
        }

        if(rules.maxLength)
        {
            isValid = value.length >= rules.maxLength && isValid;
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
        updatedOrderForm[targetElementId] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({orderForm:updatedOrderForm});

    }
    orderHandler(event) {

        event.preventDefault();

        this.setState({ loading: true })

        const orderData = {};
        for(let formElementIdenditifier in this.state.orderForm)
        {
            orderData[formElementIdenditifier] = this.state.orderForm[formElementIdenditifier]['value'];
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData:orderData
        }
        axiosInstance.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.replace('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            })

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
                onChangeHandler={(event)=>this.inputChangeHandler(event,formElement.id)}
                />);
        });

        let contact_form_jsx = (<Fragment>
            <h4>Enter your Contact data :</h4>
            <form onSubmit={this.orderHandler.bind(this)} >
                {input_jsx}
                <Button >Order</Button>
            </form>
        </Fragment>);

        if (this.state.loading) {
            contact_form_jsx = <Spinner />
        }

        return (
            <div className={classes.ContactData} >
                {contact_form_jsx}
            </div>
        );

    }

}

export default WithAxiosErrorHandler(ContactData, axiosInstance);