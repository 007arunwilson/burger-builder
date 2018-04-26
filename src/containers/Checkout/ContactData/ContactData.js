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
                }
            },
            street: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                }
            },
            zipCode: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code',
                }
            },
            country: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'Country',
                }
            },
            email: {
                elementType:'input',
                value:'',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Mail',
                }
            },
            delieveryMethod: {
                elementType:'select',
                value:'',
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

    inputChangeHandler(event,targetElementId){

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[targetElementId]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[targetElementId] = updatedFormElement;
        this.setState({orderForm:updatedOrderForm});

    }
    orderHandler(event) {

        event.preventDefault();

        this.setState({ loading: true })

        console.log('Purchase Continue : ', true);
        this.setState({ loadiing: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Arun Wilson',
                addres: {
                    street: 'lorem Streets',
                    zipcode: '58654',
                    country: 'Canada',
                },
                email: 'cyberinfoscripter@gmail.com'
            },
            deliveryMethod: 'fastest'
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
                onChangeHandler={(event)=>this.inputChangeHandler(event,formElement.id)}
                />);
        });

        let contact_form_jsx = (<Fragment>
            <h4>Enter your Contact data :</h4>
            <form>
                {input_jsx}
                <Button clicked={this.orderHandler.bind(this)} >Order</Button>
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