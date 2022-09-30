import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';

import { Button2 } from './theme';

import LoginIcon from '../assets/img/account.png'
import Email from '../assets/img/email.png'
import Password from '../assets/img/key.png'

export default function Footer() {

    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [infor, setInfor] = useState(true)

    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    const loginAsAdmin = () => {
        setModalVisible(!isModalVisible)
    }
    const handleLogin = (e) => {
        if (!password || !email) {
            e.preventDefault()
            if (!email) {
                return refEmail.current.focus()
            }
            if (!password) {
                return refPassword.current.focus()
            }
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            e.preventDefault();
            refEmail.current.select();
            return refEmail.current.focus()
        }
        if (password !== "rumman0313)#!#" || email !== "rumman@auction.com") {
            e.preventDefault()
            setInfor(false)
        }

        window.sessionStorage.setItem("loggedin", "0")
    }
    return (
        <div className="footer">
            <div style={{ textAlign: "center", color: "#c0bfbe", fontSize: "18px" }}>
                COPYRIGHT © 2021 TRENDINGGROUP S.L. ALL RIGHTS RESERVED.
            </div>
            <div>
                <div className="router-link" onClick={loginAsAdmin}>
                    Login as Admin
                </div>
                <Modal
                    isOpen={isModalVisible}
                    onRequestClose={handleModal}
                    contentLabel="Warning"
                    className="modal_style"
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={false}
                >
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <div style={{ padding: "6px", borderRadius: "50%", color: "white", width: "20px", height: "20px", marginLeft: "95%", cursor: "pointer", backgroundColor: "#574c81", textAlign: "center" }} onClick={handleModal}>X </div>
                        <img src={LoginIcon} alt="login_icon" width="50px" className="login_icon" />
                        <div style={{ marginTop: "20px" }}>
                            <span style={{ marginRight: "20px" }}>
                                <img src={Email} alt="email" width="20px" />
                            </span>
                            <input ref={refEmail} type="text" placeholder="Email.." className="input_text_style" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <span style={{ marginRight: "20px" }}>
                                <img src={Password} alt="password" width="20px" />
                            </span>
                            <input ref={refPassword} type="password" placeholder="Password.." className="input_text_style" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {infor === false ?
                            <div style={{ color: "yellow", marginTop: "30px", textAlign: "left", marginLeft: "10%" }}>Incorrect email or password. Try again...</div> :
                            null
                        }
                        <Link to="/admin/dashboard" className="router-link" aria-disabled={true}>
                            <Button2 btnContent="LOGIN" btn2Class="theme_button_2" handleEvent={handleLogin} />
                        </Link>
                    </div>
                </Modal>
            </div>
        </div>
    )
}