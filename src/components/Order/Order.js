import React from 'react';
import classes  from './Order.css';

const order = (props) => {

    console.log(props.ingredients);

    return (
        <div className={classes.Order}>
            <p>Ingredients: {
                Object.keys(props.ingredients).map(ing_key=>{

                    return(<span
                    key={ing_key}
                    style={
                        {
                        border:'1px solid rgb(220, 220, 220)',
                        padding:'4px',
                        margin:'0px 4px',
                        textTransform:'capitalize',
                        backgroundColor:'rgb(245, 245, 245)'
                        }
                    }
                    >
                    {ing_key} ({props.ingredients[ing_key]})
                    </span>);

                })
            }</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default order;