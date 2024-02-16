"use client";

const axios = require("axios");
const validator = require("email-validator");

import "../styles/login.css";
import { useState } from "react";
import { redirect } from "next/navigation";

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [susername, setSusername] = useState("");
  const [spassword, setSpassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const signUpHandler = (event: any) => {
    event.preventDefault();

    if (username.length < 5 || username.length > 10) {
      setUsernameIsValid(false);
      return;
    } else {
      setUsernameIsValid(true);
    }
    if (!validator.validate(email)) {
      setEmailIsValid(false);
      return;
    } else {
      setEmailIsValid(true);
    }
    if (password.length < 6) {
      setPasswordIsValid(false);
      return;
    } else {
      setPasswordIsValid(true);
    }

    const body = {
      userName: username,
      email,
      password,
    };

    setUsername("");
    setPassword("");
    setEmail("");

    event.target.form[0].value = "";
    event.target.form[1].value = "";
    event.target.form[2].value = "";

    axios
      .post("/api/user", body)
      .then((response: any) => {
        console.log(response);
        // redirect not working
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const signInHandler = (event: any) => {
    event.preventDefault();

    const body = { userId: susername, password: spassword };

    // findOne has problem as we dont know user will sign up with username or password

    setSusername("");
    setSpassword("");

    event.target.form[0].value = "";
    event.target.form[1].value = "";

    if (susername.length < 5 || spassword.length < 8) {
      console.log("wrong");
      setIsInvalid(true);
      return;
    } else {
      setIsInvalid(false);
    }

    // api call
    axios
      .post("/api/user/login", body)
      .then((response: any) => {
        setIsInvalid(false);
        console.log(response);
      })
      .catch((error: any) => {
        setIsInvalid(true);
        console.log(error);
      });

    console.log("Signed-In");
  };

  const changeHandler = (e: any) => {
    let value = e.target.value;
    if (e.target.placeholder === "Username") {
      setUsername(value);
    }
    if (e.target.placeholder === "Email") {
      setEmail(value);
    }
    if (e.target.placeholder === "Password") {
      setPassword(value);
    }
  };

  const loginChangeHandler = (e: any) => {
    let value = e.target.value;

    if (e.target.placeholder === "Email or Username") {
      setSusername(value);
    }
    if (e.target.placeholder === "Password") {
      setSpassword(value);
    }
  };

  const toggleForm = () => {
    setIsSignIn((prevState) => !prevState);
  };

  return (
    <div className="wrapper">
      <div
        className={`container ${isSignIn ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <br></br>
            <input
              style={{
                outline: usernameIsValid ? "" : "2px solid red",
              }}
              onChange={changeHandler}
              type="text"
              placeholder="Username"
            />
            <input
              style={{
                outline: emailIsValid ? "" : "2px solid red",
              }}
              onChange={changeHandler}
              type="email"
              placeholder="Email"
            />
            <input
              style={{
                outline: passwordIsValid ? "" : "2px solid red",
              }}
              onChange={changeHandler}
              type="password"
              placeholder="Password"
            />
            <br></br>
            {/* stay signed in */}
            <button onClick={signUpHandler}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <br></br>
            <input
              style={{
                outline: !isInvalid ? "" : "2px solid red",
              }}
              onChange={loginChangeHandler}
              type="email"
              placeholder="Email or Username"
            />
            <input
              style={{
                outline: !isInvalid ? "" : "2px solid red",
              }}
              onChange={loginChangeHandler}
              type="password"
              placeholder="Password"
            />
            <a href="#">Forgot your password?</a>
            <button onClick={signInHandler}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>
                <b>Welcome Back!</b>
              </h2>
              <p>Explore new opportunities with your job portal login</p>
              <button className="ghost" onClick={toggleForm} id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>
                <b>Welcome Aboard!</b>
              </h2>
              <p>Start exploring job opportunities with your new account.</p>
              <button className="ghost" onClick={toggleForm} id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
