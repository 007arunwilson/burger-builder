import React, { Component,Fragment } from 'react';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosInstance from '../../../axios-orders';
import WithAxiosErrorHandler from '../../../hoc/WithAxiosErrorHandler/WithAxiosErrorHandler';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false,
    }

    componentDidMount() {

        console.log('[ContactData] props ', this.props);


    }
    orderHandler(event){

        event.preventDefault();

        this.setState({loading:true})

        console.log('Purchase Continue : ',true);
        this.setState({loadiing:true});

        const order = {
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            customer:{
                name:'Arun Wilson',
                addres:{
                    street:'lorem Streets',
                    zipcode:'58654',
                    country:'Canada',
                },
                email:'cyberinfoscripter@gmail.com'
            },
            deliveryMethod:'fastest'
        }
        axiosInstance.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false});
            this.props.history.replace('/');
        })
        .catch(error=>{
            this.setState({loading:false});
        })

    }

    render() {

        // let contact_form_jsx = this.state.loading ? <Spinner/>:;

        let contact_form_jsx  = (<Fragment>
            <h4>Enter your Contact data :</h4>
            <form>
                <input type="text" name="name" placeholder="Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="text" name="name" placeholder="Street" />
                <input type="text" name="name" placeholder="Postal Code" />
                <Button clicked={this.orderHandler.bind(this)} >Order</Button>
            </form>
            </Fragment>);

        if(this.state.loading)
        {
            contact_form_jsx = <Spinner/>
        }

        return (
            <div className={classes.ContactData} >
                {contact_form_jsx}
            </div>
            );
    
        }
    
    }
    
export default WithAxiosErrorHandler(ContactData);