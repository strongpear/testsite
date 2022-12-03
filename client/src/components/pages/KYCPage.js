import Axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

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
    var valid = true;
    const regex_firtname_lastname = new RegExp("^[a-zA-Z]+$");
    const regex_licence = new RegExp('^[0-9]{8}$')
    const regex_state = new RegExp('^[A-Za-z]{2}$')
    const regex_zip = new RegExp('^[0-9]{5}$')
    const regex_date = new RegExp("^(0[1-9]|1[0-2])\/([0-2][0-9]|3[01])\/(19|20)[0-9][0-9]$");
    console.log(`Before the check valid is ${valid}`)
    console.log(`Firstname is ${firstname} and ${regex_firtname_lastname.test(firstname)}`)
    console.log(`Lastname is ${lastname} and ${regex_firtname_lastname.test(lastname)}`)
    console.log(`Licence is ${driverid} and ${regex_licence.test(driverid)}`)
    console.log(`State is ${state} and ${regex_state.test(state)}`)
    console.log(`Zip is ${zip} and ${regex_zip.test(zip)}`)
    console.log(`Date is ${birthdate} and ${regex_date.test(birthdate)}`)
    if(!regex_firtname_lastname.test(firstname)){
        valid = false;
        console.log(`First name must be letters`)
    }
    if(!regex_firtname_lastname.test(lastname)){
        valid = false;
        console.log(`Last name must be letters`)
    }
    if(!regex_licence.test(driverid)){
        valid = false;
        console.log(`Driver License ID must contain 8 digits`)
    }
    if(!regex_state.test(state)){
        valid = false;
        console.log(`State must contain 2 letters`)
    }
    if(!regex_zip.test(zip)){
        valid = false;
        console.log(`Zipcode must contain 5 digits`)
    }
    if(!regex_date.test(birthdate)){
        valid = false;
        console.log(`Birth Date must be in form of mm/dd/yyyy`)
    }
    console.log(`After the check valid is ${valid}`)
    if(valid){
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
                    required
                    pattern="[A-Za-z].{0,}"
                    title="First name must be letters"
                    id="firstname"
                    onChange = {(e) => {setFirstname(e.target.value);}}
                />
            </p>
            <p>
                <label>Last Name</label><br/>
                <input 
                    type="text"
                    required
                    pattern="[A-Za-z].{0,}"
                    title="Last name must be letters"
                    id="lastname"
                    onChange = {(e) => {setLastname(e.target.value);}}
                />
            </p>
            <p>
                <label>Drivers License ID</label><br/>
                <input 
                    type="text"
                    required
                    pattern="[0-9]{8}"
                    title="Driver License ID must contain 8 digits"
                    placeholder="12345678"
                    id="driverid"
                    onChange = {(e) => {setDriverID(e.target.value);}}
                />
            </p>
            <p>
                <label>State</label><br/>
                <input 
                    type="text"
                    required
                    pattern="[A-Za-z]{2}"
                    title="State must contain 2 letters"
                    placeholder="TX"
                    id="state"
                    onChange = {(e) => {setState(e.target.value);}} 
                /> 
            </p>
            <p>
                <label>ZIP</label><br/>
                <input 
                    type="text" 
                    required
                    pattern="[0-9]{5}"
                    title="Zipcode must contain 5 digits"
                    placeholder="77840"
                    id="zip"
                    onChange = {(e) => {setZip(e.target.value);}} 
                /> 
            </p>
            <p>
                <label>Birth Date</label><br/>
                <input 
                    type="text"
                    required
                    pattern="(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}"
                    title="Birth Date must be in form of mm/dd/yyyy"
                    placeholder="12/14/2022"
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