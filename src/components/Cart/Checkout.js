import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;

    const enteredStreet = streetInputRef.current.value;

    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);

    const enteredStreetIsValid = !isEmpty(enteredStreet);

    const enteredCityIsValid = !isEmpty(enteredCity);

    const enteredPostalCodeIsValid = !isFiveChars(enteredName);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>plese enter a valid name!</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="name" ref={streetInputRef} />
        {!formInputsValidity.street && <p>pleae enter a valid sreet</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="name" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>pleae enter a valid potal Code</p>
        )}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">city</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>plee enter a valid city </p>}
      </div>
      <button type="button" onClick={props.onCancel}>
        cancel
      </button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
