import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../action/UserAction";
// import { detailsUser } from "../action/UserAction";

function SignInScreen(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);

  const { loading, userInfo, error } = userSignin;

  const redirect=props.location.search?props.location.search.split("=")[1]:"/"
  const dispatch = useDispatch();

  useEffect(() => {
    if(userInfo){
      props.history.push(redirect)
    }
    return () => {};
  },[userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin({email, password}));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign in</h2>
          </li>
          <li>
            {loading && <h1>Loading....</h1>}
            {error && (
              <div>
                <h3>{error}</h3>
              </div>
            )}
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              SignIn
            </button>
          </li>
          <li>
            <label>New to amazon:</label>
            <Link to={redirect === "/"?"register":"register?redirect="+redirect} >
              <button className="button text-center button.secondary">
                Create your amazon account
              </button>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SignInScreen;
