import {createStore,combineReducers, applyMiddleware,compose} from "redux";
import { productDeleteReducer, productDetailsReducer, productReducer, productSaveReducer } from "./reducer/productReducer";
// import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk"
import { cartReducer } from "./reducer/cartReducer";
import Cookie from 'js-cookie';
import { userRegisterReducer, userSigninReducer } from "./reducer/UserReducer";

  /*-------------------------js-cookie used for that to store local storage data ------------------*/
var cartItems=Cookie.get("cartItems") || [];

var userInfo=Cookie.get("userInfo") || null;

try{
  userInfo=JSON.parse(userInfo);
}
catch(err){
  console.log("error in user info is",err.message)
}

try{
cartItems=JSON.parse(cartItems)
}
catch(err){
  console.log("error in cart items is",err.message)
}

// cartItems=JSON.parse(userInfo)

console.log("userinfo=>",userInfo)

// userInfo.remove()///;
console.log("cartinfo=",cartItems)
const initialState={cart:{cartItems},userSignin:{userInfo},shipping:{},payment:{}};


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer=combineReducers({
    productList:productReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer
})
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));
export default store;