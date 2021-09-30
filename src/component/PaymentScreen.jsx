import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { savePayment } from "../action/CatAction";
import CheckoutStep from "../screen/CheckoutStep";
// import { detailsUser } from "../action/UserAction";

function PaymentScreen(props) {

   const [paymentMethod,setPaymentMethod]=useState()
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({paymentMethod}));
    props.history.push("placeorder")
  };

  return (
    <div>
    <CheckoutStep step1 step2 step3></CheckoutStep>
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>payment</h2>
          </li>
          <li>
          <input
              type="radio"
              name="paymentMethod"
              id="paymentMethod"
              value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlfor="address " className="paypal-center">paypal</label>
           
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

export default PaymentScreen;
