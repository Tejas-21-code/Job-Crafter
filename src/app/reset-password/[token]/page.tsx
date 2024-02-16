"use client";

import "../../styles/reset.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [pass, setPass] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [data, setData] = useState({});

  const { token } = useParams();

  useEffect(() => {
    axios
      .post("/api/verify-token", { token })
      .then(async (response) => {
        setIsVerified(true);
        let newData = await response.data;
        setData(newData);
      })
      .catch((error) => {
        setIsVerified(false);
        console.log(error);
      });
  }, []);

  // put everything in useEffect everything under

  const changeHandler = (event: any) => {
    setPass(event.target.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    event.target.form[0].value = "";

    axios
      .patch(`/api/user`, { password: pass, email: data.email })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <form>
        <h1>Reset Password</h1>
        <div className="inputbox">
          <input type="text" onChange={changeHandler} required />
          <label>Password</label>
        </div>
        <button
          className={isVerified ? "" : "cursor-not-allowed"}
          disabled={!isVerified}
          onClick={submitHandler}
        >
          Reset
        </button>
      </form>
    </section>
  );
}
