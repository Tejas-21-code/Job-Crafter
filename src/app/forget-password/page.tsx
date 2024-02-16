"use client";

import "../styles/forget.css";
import { useState } from "react";
import axios from "axios";
import { send } from "../lib/mail";

export default function Home() {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const changeHandler = (event: any) => {
    let value = event.target.value;
    if (event.target.placeholder === "Reset-Password") {
      setPass(value);
    }
    if (event.target.placeholder === "Email") {
      setEmail(value);
    }
  };

  const emailHandler = () => {
    axios
      .post("/api/forget-password", { email: email })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // optimize put the input and button in div and use a single send

  return (
    <section>
      <form>
        <h1>Forgot Password</h1>
        <div className="inputbox">
          <input type="email" required />
          <label>Email</label>
        </div>
        <button onClick={emailHandler}>Send</button>
      </form>
    </section>
  );
}
