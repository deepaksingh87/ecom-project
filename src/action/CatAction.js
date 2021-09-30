import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "../types/types";
import Cookie from "js-cookie";
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price * qty,
        countInStock: data.countInStock,
        qty: qty,
      },
    });
  /*-------------------------js-cookie used for that to store local storage data ------------------*/
    const {  cart:{cartItems} } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    // Cookie.set("cartItems", cartItems);
    
  } catch (error) {}
};
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  /*-------------------------js-cookie used for that to store local storage data ------------------*/
  const { cart: { cartItems }} = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
  //  Cookie.set("cartItems", cartItems);

};

const saveShipping=(address,city,postalCode,country)=>(dispatch)=>{
  const data={address,city,postalCode,country}
  dispatch({type:CART_SAVE_SHIPPING,payload:data})
}
const savePayment=(data)=>(dispatch)=>{
  dispatch({type:CART_SAVE_PAYMENT,payload:data})
}
export { addToCart, removeFromCart,saveShipping,savePayment };
