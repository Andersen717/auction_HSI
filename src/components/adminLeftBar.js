import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../main.css'

import Admin_logo from '../assets/img/logo_light.png'
import BackgroundParticles from './particles'


export default function AdminLeftBar(props) {
    const { leftbar_style } = props;

    useEffect(() => {
        if (!window.sessionStorage.getItem("loggedin")) {
            window.preventBackButton = function () {
                try {
                    if (document && (!document.cookie || document.cookie.indexOf('_tc=1') < 0)) {
                        window.document.body.style.display = 'none';
                        window.location = "/";
                    }
                } catch (e) { }
            };
            window.preventBackButton();
        }
    }, [])
    return (
        <div className={leftbar_style}>
            <div className="admin_left_bar">
                <BackgroundParticles />
                <center className="admin_logo">
                    <img src={Admin_logo} alt="Admin_logo" className="Admin_logo" />
                </center>

                <Link to="/admin/dashboard" className="Admin_Links">
                    <div style={{ marginTop: "30px" }}>
                        Dashboard
                    </div>
                </Link>
                <Link to="/admin/bid-record" className="Admin_Links">
                    <div style={{ marginTop: "30px" }}>
                        Bid Record
                    </div>
                </Link>
                <Link to="/admin/winner-record" className="Admin_Links">
                    <div style={{ marginTop: "30px" }}>
                        Winner Record
                    </div>
                </Link>
                <Link to="/admin/edit-service" className="Admin_Links">
                    <div style={{ marginTop: "30px" }}>
                        Edit Services
                    </div>
                </Link>
                <Link to="/admin/admin-accounts" className="Admin_Links">
                    <div style={{ marginTop: "30px" }}>
                        Admin Account
                    </div>
                </Link>
                <Link to="/" className="Admin_Links">
                    <div className="log_out" onClick={() => window.sessionStorage.removeItem("loggedin")}>
                        LOG OUT
                    </div>
                </Link>
            </div>
        </div>

    )
}