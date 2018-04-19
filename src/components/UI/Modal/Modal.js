import React,{Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.open!==this.props.open||this.props.children !== nextProps.children;
    }

    render() {

        return (
            <Aux>
                <Backdrop show={this.props.open} closeClickHandler={()=>this.props.closeHandler()} />
                <div 
                className={classes.Modal}
                style={{
                    transform:this.props.open===true?'translateY(0)':'translateY(-100vh)',
                    opacity:this.props.open===true?'1':'0'
                }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );


    }
    


}


export default Modal;
