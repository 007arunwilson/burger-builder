import React,{Component} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SIdeDrawer';

class layout extends Component{

    state = {
        showSideDrawer:false,
    }


    sideDrawerCloseHandler = () => {

        this.setState({showSideDrawer:false})

    }

    sideDrawerOpenHandler = () => {

        this.setState({showSideDrawer:true})

    }

    render (){

    return (
                <Aux>
                    <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
                    <SideDrawer closehandler={this.sideDrawerCloseHandler} isopen={this.state.showSideDrawer} />
                    <main className={classes.content} >
                        {this.props.children}
                    </main>
                </Aux>
            )

    }

}

export default layout;