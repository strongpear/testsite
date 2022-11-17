import React from 'react'
import { Link } from 'react-router-dom'
import Axios from "axios";

Axios.defaults.withCredentials = true

export default function HomePage() {

    const logOut = () => {
        Axios.post('/logout').then((response) => {
            console.log("logged out")
        })
    }
    const kyc = () => {
        Axios.post('/kyc').then((response) => {
            console.log("logged out")
        })
    }
    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">welcome to jaspals app</h1>
            <Link to="/kyc">
                <button className="primary-button" onClick={ kyc }>KYC Details</button>
            </Link>

            <Link to="/">
                <button className="primary-button" onClick={ logOut }>Log out</button>
            </Link>
        </div>
    )
}