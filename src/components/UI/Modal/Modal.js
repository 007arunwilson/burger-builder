import React,{Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.purchaseMode!=this.props.purchaseMode||this.props.children !== nextProps.children;
    }

    render() {

        return (
            <Aux>
            <Backdrop show={this.props.purchaseMode} closeClickHandler={this.props.purchaseModeOff} />
             <div 
             className={classes.Modal}
             style={{
                 transform:this.props.purchaseMode==true?'translateY(0)':'translateY(-100vh)',
                 opacity:this.props.purchaseMode==true?'1':'0'
             }}
             >
                 {this.props.children}
             </div>
         </Aux>
        );


    }
    


}


export default Modal;
