import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomeScreen from "./component/HomeScreen";
import ProductScreen from "./component/ProductScreen";
import CartScreen from "./component/CartScreen";
import SignInScreen from "./component/SignInScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./component/RegisterScreen";
import ProductsScreen from "./component/ProductsScreen";
import ShippingScreen from "./component/ShippingScreen";
import PaymentScreen from "./component/PaymentScreen";
import PlaceOrderScreen from "./component/PlaceOrderScreen";
function App() {
  const userSignin=useSelector(state=>state.userSignin);
  const {userInfo}=userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const oncloseMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <Router>
    <div className="App">
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">amazonapp</Link>
          </div>
          <div className="header-link">
            <Link to="/cart">card</Link>
            {
            userInfo ?<Link to="/profile">{userInfo.name}</Link>:
            <a href="/signin">Signin</a>
            }
            <Link to="/product">add product</Link>
          </div>
         
        </header>
        <aside className="sidebar">
          <h3>Shopping category</h3>
          <button className="close-sidebar" onClick={oncloseMenu}>
            X
          </button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="shirt.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/products/:id" component={ProductScreen}/>
            <Route path="/register" component={RegisterScreen}/>
            <Route path="/placeorder" component={PlaceOrderScreen}/>
            <Route path="/payment" component={PaymentScreen}/>
            <Route path="/shipping" component={ShippingScreen}/>
            <Route path="/signin" component={SignInScreen}/>
            <Route path="/product" component={ProductsScreen}/>
            <Route path="/cart/:id?" component={CartScreen}/>
            <Route path="/" exact={true} component={HomeScreen}/>
          </div>
        </main>
        <footer className="footer">@copyright all right reserved</footer>
      </div>
    </div>
   </Router>
  );
}

export default App;
