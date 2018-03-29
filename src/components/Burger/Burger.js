import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let ingredientsTransformed = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_,i)=>{
           return <BurgerIngredient key={ingKey+i} type={ingKey}   />
        })
    }).reduce((preVal,curVal)=>{
        return preVal.concat(curVal);
    },[]);

    console.log(ingredientsTransformed);

    ingredientsTransformed = ingredientsTransformed.length?ingredientsTransformed:<p>Please add some ingredients</p>;

    return (
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top"  />
            {ingredientsTransformed}
            <BurgerIngredient type="bread-bottom"   />
        </div>
    );

}

export default burger;
