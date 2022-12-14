import Axios from "axios";
import React from 'react'
import { Link } from 'react-router-dom'
import { Fragment, useEffect, useState } from "react";

Axios.defaults.withCredentials = true

export default function HomePage() {
    const [username, setUsername] = useState("")

    const getUsername = async () => {
        const res = await Axios.post('/home');
        console.log(`This is the front end for the homepage`)
        console.log(res.data)
        setUsername(res.data);
    }
    useEffect(() => {
        getUsername();
    });

    const logOut = () => {
        Axios.post('/logout', {withCredentials: true}).then((response) => {
            console.log("logged out")
        })
    }
    console.log(username)  //username.mpa
    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">{username}</h1>
            <Link to="/kyc">
                <button className="primary-button">KYC Details</button>
            </Link>

            <Link to="/payment">
                <button className="primary-button">Pay</button>
            </Link>

            <Link to="/">
                <button className="primary-button" onClick={ logOut }>Log out</button>
            </Link>
        </div>
    )
}