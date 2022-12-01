import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import '../../App.css'

Axios.defaults.withCredentials = true


export default function PaymentPage() {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const paymentinfo = () => {
    Axios.post('/send', {
      receiver: receiver,
      amount: amount,
      message: message
    }).then((response) => {
      console.log(response);
    })
  }
  
    return (
        <div className="text-center m-5-auto">
            <h2>Payment Page</h2>
            {/* <h5>Update your KYC details</h5> */}
            <form action="/home">
                <p>
                    <label>Receiver</label><br/>
                    <input 
                        type="text"
                        id="receiver"
                        onChange = {(e) => {setReceiver(e.target.value);}}
                    />
                </p>
                <p>
                    <label>Amount</label><br/>
                    <input 
                        type="number"
                        min="0.01"
                        step="0.01"
                        id="amount"
                        onChange = {(e) => {setAmount(e.target.value);}}
                    />
                </p>
                <p>
                    <label>Message</label><br/>
                    <input 
                        type="text"
                        id="message"
                        onChange = {(e) => {setMessage(e.target.value);}} 
                    /> 
                </p>
                {/* <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all information is correct </span>.
                </p> */}
                <p>
                    <button id="sub_btn" type="submit" onClick={paymentinfo}>Pay</button>
                </p>
            </form>
            <footer>
                <p><Link to="/home">Back to Dashboard</Link>.</p>
            </footer>
        </div>
    )
}