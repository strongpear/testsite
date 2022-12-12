import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Axios from "axios";

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'

Axios.defaults.withCredentials = true

const mySession = {}
mySession.user = ""
export {
    mySession
}

export default function LandingPage() {
    const [user, setUser] = useState({});

  
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    console.log(window.location.href);
    window.location.replace(window.location.href+"home");
    setUser(userObject);
    document.getElementById("signInDiv").hidden = false;
  }

  /* prompt again
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    google.accounts.id.prompt()
  }
  */

  useEffect(() => {
    /* global google */
    /*google.accounts.id.initialize({
      client_id: "787802789658-som6i2h91g2t708bhkg5m3aen4tb1rpa.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme:"outline", size: "large" }
    )
*/
  },  []);
  
  return (
        <div className="App">
            <Link to="/home">
                <div id="signInDiv"></div>
                {/* {
                    Object.keys(user).length != 0 &&
                    <button onClick= { (e) => handleSignOut(e)}>Sign Out</button>
                } */}
                {/* { user &&
                <div>
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>
                } */}
            </Link>
        <header style={ HeaderStyle }>
            <h1 className="main-title text-center">login / register page</h1>
            <p className="main-para text-center">join us now and don't waste time!!</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link>
            </div>
        </header>
    </div>

  );
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}