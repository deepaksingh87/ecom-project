import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../action/UserAction";
// import { detailsUser } from "../action/UserAction";

function RegisterScreen(props) {

    const [name,setName]=useState('')
    const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [repassword, resetPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, userInfo, error } = userRegister;
  const redirect=props.location.search?props.location.search.split("=")[1]:"/"


  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {};
  },[userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name,email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create an account</h2>
          </li>
          <li>
            {loading && <p>loading....</p>}
            {error && (
              <div>
                <h3>{error}</h3>
              </div>
            )}
          </li>
          <li>
            <label htmlfor="name">Name:</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
          <label htmlfor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlfor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
             <label htmlfor="repassword">Re-enter-Password:</label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              onChange={(e) => resetPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
            Create your amazon account
            </button>
          </li>
          <li>
            Already have an account
            <Link to={redirect === "/"?"signin":"signin?redirect="+redirect} >
              <button className="button text-center button.secondary">
                SignIn
              </button>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
