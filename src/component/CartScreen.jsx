import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../action/CatAction";

function CartScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  let {cartItems}=cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return ()=>{

    }
  }, []);
  
  const removeFromCartHandler=(productId)=>{
             dispatch(removeFromCart(productId))
  }
  const checkOutHandler=()=>{
       props.history.push("/signin?redirect=shipping")
  }

  return (
    <div className="cart">
      <div className="cart-list">
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
                          QTY:
                          <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,e.target.value))}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                          </select>
                          <button type="button" onClick={()=>removeFromCartHandler(item.product)}>
                            Delete
                          </button>
                          </div>
                  </div>
                  <div className="cart-price">&#8377;{item.price}</div>
           </li>)
           }
        </ul>
      </div>
      <div className="cart-action">
          <h3>
              {/* SubTotal({cartItems.reduce((a,c)=>a+c.qty),0} items): */}
              total price of product:
              &#8377; {cartItems.reduce((a,c)=>a+c.price*qty,0)}
          </h3>
          <button className="primary button full-width" onClick={checkOutHandler} disabled={cartItems.length===0}>proceed to cakeout</button>
      </div>
    </div>
  );
}

export default CartScreen;
