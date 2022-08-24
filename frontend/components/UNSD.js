import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import UAuth from "@uauth/js";

const unstoppableauth = new UAuth({
  clientID: "2cf87675-dbda-4dab-a47a-0ea2df28a385",
  redirectUri: "http://localhost:3000",
});

export default function UNSD() {
  const [Uauth, setUauth] = useState();
  async function connectWallet() {
    try {
      const auth = await unstoppableauth.loginWithPopup();
      setUauth(JSON.parse(JSON.stringify(auth))["idToken"]);
    } catch (error) {
      console.error(error);
    }
  }
  async function logOut() {
   await unstoppableauth.logout();
  }

  function log() {
    if (Uauth === null || Uauth === undefined) {
      connectWallet();
    } else {
      logOut();
    }
  }
  return (
    <button onClick={log} className={styles.btn}>
      {Uauth != null ? Uauth["sub"] : "Login with UNSD"}
    </button>
  );
}

