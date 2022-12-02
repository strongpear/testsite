import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'

import '../../App.css'
Axios.defaults.withCredentials = true
export default function SignUpPage() {
  const [usernameReg, setUsernameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const register = () => {
    var valid = true;
    const regex_email = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
    const regex_password_username = new RegExp('.{6,}');
    console.log(`Before the check valid is ${valid}`)
    console.log(regex_email.test(emailReg))
    if(!regex_email.test(emailReg)){
        valid = false;
        console.log(`Email not inputed correctly`)
    }
    if(!regex_password_username.test(usernameReg)){
        valid = false;
        console.log(`Username must contain 6 or more characters`)
    }
    if(!regex_password_username.test(passwordReg)){
        valid = false;
        console.log(`Password must contain 6 or more characters`)
    }
    console.log(`After the check valid is ${valid}`)
    if(valid){
        Axios.post('/register', {
        username: usernameReg,
        email: emailReg, 
        password: passwordReg,
        withCredentials: true
        }).then((response) => {
        console.log(response);
        })
    }
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
                    required
                    pattern=".{6,}"
                    title="Username must contain 6 or more characters"
                    placeholder="username123"
                    id="usernameReg"
                    onChange = {(e) => {setUsernameReg(e.target.value);}}
                />
            </p>
            <p>
                <label>Email address</label><br/>
                <input 
                    type="text"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    placeholder="email@email.com"
                    id="emailReg"
                    onChange = {(e) => {setEmailReg(e.target.value);}} 
                /> 
            </p>
            <p>
                <label>Password</label><br/>
                <input 
                    type="password"
                    required
                    pattern=".{6,}"
                    title="Password must contain 6 or more characters"
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
