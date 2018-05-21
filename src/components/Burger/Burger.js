import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
    let ingredientsTransformed = null;
    if (props.ingredients) {
        ingredientsTransformed = Object.keys(props.ingredients)
      .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
          return <BurgerIngredient key={ingKey + i} type={ingKey} />;
        });
      })
      .reduce((preVal, curVal) => {
        return preVal.concat(curVal);
      }, []);
  } else ingredientsTransformed = [];

  ingredientsTransformed = ingredientsTransformed.length ? (
    ingredientsTransformed
  ) : (
    <p
      style={{
        color: "rgb(111, 111, 111)",
        fontSize: "12px",
        fontWeight: "normal"
      }}
    >
      Please add some ingredients
    </p>
  );

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsTransformed}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
