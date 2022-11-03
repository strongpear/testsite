import { Link } from 'react-router-dom'
import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

Axios.defaults.withCredentials = true

export default function AdminPage() {

    const [KYC, setKYC] = useState([])

    const getKYC = async () => {
        const res = await Axios.get('/admin');
        console.log(res)
        if (res.data.rows) {
            setKYC(res.data.rows);
        }
    }

    useEffect(() => {
        getKYC();
    }, []);

    console.log(KYC);
    return (
        <div className="text-center m-5-auto">
            <h2>Admin Page</h2>
            <table className="center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Date</th>
                        <th>Driver ID</th>
                        <th>State</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                    {KYC.map(person => (
                        <tr>
                            <td>{person.id}</td>
                            <td>{person.firstname}</td>
                            <td>{person.lastname}</td>
                            <td>{person.birthdate}</td>
                            <td>{person.driverid}</td>
                            <td>{person.state}</td>
                            <td>{person.zip}</td>
                            <td>
                                <button id="sub_btn" type="submit">Accept</button>
                            </td>
                            <td>
                                <button id="sub_btn" type="submit">Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}