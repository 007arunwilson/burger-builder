import React,{Component} from 'react';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {

    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        }
    }

    render(){

        return (
            <div className={classes.ContactData} >
                <h4>Enter your Contact data :</h4>
                <form>
                        <input type="text" name="name" placeholder="Name" />
                        <input type="email" name="email" placeholder="Email" />
                        <input type="text" name="name" placeholder="Street" />
                        <input type="text" name="name" placeholder="Postal Code" />
                        <Button>Order</Button>
                </form>
            </div>
        );

    }

}

export default ContactData;