import React,{Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SIdeDrawer';

class layout extends Component{


    render (){

    return (
                <Aux>
                    <Toolbar/>
                    <SideDrawer />
                    <main className={classes.content} >
                        {this.props.children}
                    </main>
                </Aux>
            )

    }

}

export default layout;