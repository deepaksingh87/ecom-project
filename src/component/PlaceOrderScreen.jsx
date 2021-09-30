import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart} from "../action/CatAction";
import CheckoutStep from "../screen/CheckoutStep";

function PlaceOrderScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  let {cartItems,shipping,payment}=cart;

  if(!shipping){
    props.history.push("/shipping")
  }
  if(!payment){
    props.history.push("/payment")
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return ()=>{

    }
  }, []);
  
 
  const checkOutHandler=()=>{
       props.history.push("/")
  }

  return (
    <div>
      <CheckoutStep step1 step2 step3 step4></CheckoutStep>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>Shipping</h3>
          <div>
            {cart.shipping.address},{cart.shipping.city},
            {cart.shipping.postalCode},{cart.shipping.country}
          </div>
          <div>
            <h3>payment</h3>
            <div>
              Payment Method:{cart.payment.paymentMethod}
            </div>
          </div>
          <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>price</div>
          </li>
          {console.log("artes=",cartItems)}
          {console.log("artes length===>",cartItems.length)}
          {console.log("array data=",Array.from(cartItems))}
          {console.log("array data=",Object.assign(cartItems))}
          {/* {console.log("join function===>",cartItems.join("{"))} */}
          
          {
              cartItems.length===0?
              <div>Cart is Empty</div>:
            cartItems.map((item)=>
              <li key={item.product}>
                <div className="cart-image">
                <img src={item.image} alt="" className="image-cart"/>
                </div>
                  <div className="cart-name">
                      <div>
                          {item.name}
                      </div>
                      <div>
                          QTY:{item.qty}
                          </div>
                  </div>
                  <div className="cart-price">&#8377;{item.price}</div>
           </li>)
           }
        </ul>
        </div>
        
      </div>
      <div className="placeorder-action">
          <h3>
              {/* SubTotal({cartItems.reduce((a,c)=>a+c.qty),0} items): */}
              total price of product:
               $ {cartItems.reduce((a,c)=>a+c.price*qty,0)}
          </h3>
          <button className="primary button full-width" onClick={checkOutHandler} disabled={cartItems.length===0}>proceed to cakeout</button>
      </div>
    </div>
    </div>

  );
}

export default PlaceOrderScreen;
