import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'

import '../../App.css'

export default function SignUpPage() {
  const [usernameReg, setUsernameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      email: emailReg, 
      password: passwordReg
    }).then((response) => {
      console.log(response);
    })
  }
  
    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form action="/login">
                <p>
                    <label>Username</label><br/>
                    <input 
                        type="text"
                        id="usernameReg"
                        onChange = {(e) => {setUsernameReg(e.target.value);}}
                    />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input 
                        type="text"
                        id="emailReg"
                        onChange = {(e) => {setEmailReg(e.target.value);}} 
                    /> 
                </p>
                <p>
                    <label>Password</label><br/>
                    <input 
                        type="password"
                        id="passwordReg"
                        onChange = {(e) => {setPasswordReg(e.target.value);}}
                    />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={register}>Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
