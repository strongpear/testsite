import React from 'react'
import {createBrowserHistory} from 'history'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Axios from "axios";

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import KYCPage from './components/pages/KYCPage'
import AdminPage from './components/pages/AdminPage'
import PaymentPage from './components/pages/PaymentPage'

import './App.css'

Axios.defaults.withCredentials = true


export default function App() {
    return (
        <Router history={createBrowserHistory}>
            <div>
                <Switch>
                    <Route exact path="/" component={ LandingPage } />
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/forget-password" component={ ForgetPasswordPage } />
                    <Route path="/home" component={ HomePage } />
                    <Route path="/kyc" component={ KYCPage } />
                    <Route path="/admin" component={ AdminPage } />
                    <Route path="/payment" component={ PaymentPage } />
                </Switch>
            </div>
        </Router>
    )
}

