import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  // console.log("items", items);
  const numberOfCartItems = items.reduce((previousReturnValue, item) => {
    // console.log("sssssssskkkkkkkk", item);
    return previousReturnValue + item.amount;
  }, 0);

  // let numberOfCartItems = 0;

  // items.forEach((item, index) => {
  //   console.log("ee", index, item);

  //   numberOfCartItems += item.aount;
  // });

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      console.log("tt", items);
      return;
    }
    setBtnIsHighlighted(false);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const cardClass =
    numberOfCartItems === 0 ? classes.badgeEmpty : classes.badge;

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={cardClass}>{numberOfCartItems}</span>
    </button>
  );
};
// numberOfCartItems
//   ? classes.badge(numberOfCartItems < 1)
//   : classes.badgeEmpty(numberOfCartItems > 0);
export default HeaderCartButton;
//<span className={classes.badgeEmpty("0< 1")}>{numberOfCartItems}</span>;
