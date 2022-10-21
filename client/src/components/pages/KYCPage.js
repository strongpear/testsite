import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function KYCPage() {
    return (
        <div className="text-center m-5-auto">
            <h2>Upload your documentation</h2>
            <h5>We require you to upload official identification to complete your registration</h5>
            <form>
                <p>
                    <input type="file" id="myFile" name="filename"/>
                </p>
                <p>
                    <input type="text"/>
                </p>
            </form>
        </div>
        
    )
}
