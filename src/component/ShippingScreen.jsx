import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShipping } from "../action/CatAction";
import CheckoutStep from "../screen/CheckoutStep";
// import { detailsUser } from "../action/UserAction";

function ShippingScreen(props) {

    const [address,setAddress]=useState('')
    const [city,setCity]=useState('')
    const [postalCode,setPostalCode]=useState('')
    const [country,setCountry]=useState('')

  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping(address,city,postalCode,country));
    props.history.push("/payment")
  };

  return (
    <div>
    <CheckoutStep step1 step2></CheckoutStep>
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>
          <li>
            <label htmlfor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlfor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlfor="postalCode">Postal code:</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={(e) =>setPostalCode(e.target.value)}
            ></input>
          </li>

          <li>
            <label htmlfor="country">Address:</label>
            <input
              type="text"
              name="country"
              id="country"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </li>
          
          <li>
            <button type="submit" className="button primary">
            continue
            </button>
          </li>
        </ul>
      </form>
    </div>
    </div>
  );
}

export default ShippingScreen;
