import Axios from "axios";
import React from 'react'
import { Link } from 'react-router-dom'
import { Fragment, useEffect, useState } from "react";

Axios.defaults.withCredentials = true

export default function HomePage() {
    const [username, setUsername] = useState([])

    const getUsername = async () => {
        const res = await Axios.post('/home');
        console.log(res)
        setUsername(res);
    }
    useEffect(() => {
        getUsername();
    }, []);

    const logOut = () => {
        Axios.post('/logout').then((response) => {
            console.log("logged out")
        })
    }
    return (
        <div className="text-center">
            <h1 className="main-title home-page-title">{username}</h1>
            <Link to="/kyc">
                <button className="primary-button">KYC Details</button>
            </Link>

            <Link to="/">
                <button className="primary-button" onClick={ logOut }>Log out</button>
            </Link>
        </div>
    )
}