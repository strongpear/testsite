import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'

import '../../App.css'

Axios.defaults.withCredentials = true

export default function KYCPage() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [driverid, setDriverID] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [birthdate, setBirthDate] = useState('');

  const kycform = () => {
    Axios.post('/kycform', {
      firstname: firstname,
      lastname: lastname,
      driverid: driverid,
      state: state,
      zip: zip,
      birthdate: birthdate,
      withCredentials: true
    }).then((response) => {
      console.log(response);
    })
  }
  
    return (
        <div className="text-center m-5-auto">
            <h2>Profile</h2>
            <h5>Update your KYC details</h5>
            <form action="/home">
                <p>
                    <label>First Name</label><br/>
                    <input 
                        type="text"
                        id="firstname"
                        onChange = {(e) => {setFirstname(e.target.value);}}
                    />
                </p>
                <p>
                    <label>Last Name</label><br/>
                    <input 
                        type="text"
                        id="lastname"
                        onChange = {(e) => {setLastname(e.target.value);}}
                    />
                </p>
                <p>
                    <label>Drivers License ID</label><br/>
                    <input 
                        type="text"
                        id="driverid"
                        onChange = {(e) => {setDriverID(e.target.value);}}
                    />
                </p>
                <p>
                    <label>State</label><br/>
                    <input 
                        type="text"
                        id="state"
                        onChange = {(e) => {setState(e.target.value);}} 
                    /> 
                </p>
                <p>
                    <label>ZIP</label><br/>
                    <input 
                        type="text"
                        id="zip"
                        onChange = {(e) => {setZip(e.target.value);}} 
                    /> 
                </p>
                <p>
                    <label>Birth Date</label><br/>
                    <input 
                        type="text"
                        id="birthdate"
                        onChange = {(e) => {setBirthDate(e.target.value);}}
                    />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all information is correct </span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={kycform}>Save</button>
                </p>
            </form>
            <footer>
                <p><Link to="/home">Back to Dashboard</Link>.</p>
            </footer>
        </div>
    )
}