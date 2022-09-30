import React, { useState, useEffect, useRef } from 'react'
import { Grid } from '@material-ui/core'
import Modal from 'react-modal';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

import { Underline } from '../../components/theme'
import BackgroundParticles from '../../components/particles'
import { Button1 } from '../../components/theme'
import { Button2 } from '../../components/theme'

import Topic_image from '../../assets/img/service_topic.png'
import WalletImage from '../../assets/img/wallet.png'
import sendMoney from '../../assets/img/send.png'
import ETH from '../../assets/img/eth-w.png'
import BSC from '../../assets/img/bsc-w.png'
import Matic from '../../assets/img/matic-w.png'
import Fantom from '../../assets/img/fantom-w.png'
import BUSD from '../../assets/img/busd-w.png'
import USDT from '../../assets/img/usdt-w.png'
import Loading from '../../assets/img/loading.gif'
import Telegram from '../../assets/img/telegram.png'
import Email from '../../assets/img/email.png'
import Success from '../../assets/img/correct.png'
import Clip_funnel from "../../assets/img/clip-funnel.svg"
import copyClip from '../../assets/img/copy-clip.svg'

import '../../main.css'

import Header from '../../components/header'
import Footer from '../../components/footer'

export default function Bid() {

    const refContainer = useRef(null);
    const refTelegram = useRef(null);
    const refEmail = useRef(null);
    const [btnContent, setBtnConetent] = useState("")
    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);
    const [isModalVisibleConfirm, setModalVisibleConfirm] = useState(false);
    const [isModalVisible4, setModalVisible4] = useState(false);
    const [isCopied, setIsCopied] = useState(false)
    const [amount, setAmount] = useState(0)
    const [randomAmount, setRandomAmount] = useState(0)
    const [network, setNetwork] = useState()
    const [flag1, setFlag1] = useState(true)
    const [flag2, setFlag2] = useState(true)
    const [token1, setToken1] = useState("ETH")
    const [token2, setToken2] = useState("BNB")
    const [bidStatus, setBidStatus] = useState([])
    const [currency, setCurrency] = useState("")
    const [copiedStatus, setCopiedStatus] = useState(false)
    const [phone, setPhone] = useState()
    const [telegram, setTelegram] = useState("")
    const [email, setEmail] = useState("")

    const [handleLoading, setHandleLoading] = useState(false)
    const [processStep, setProcessStep] = useState("1")


    const reduxData = useSelector(state => state)
    const selectedService = reduxData.selectedService

    const handleModal1 = () => {
        setModalVisible1(!isModalVisible1)
    }
    const handleModal2 = () => {
        setModalVisible2(!isModalVisible2)
    }
    const handleModal3 = () => {
        setModalVisible3(!isModalVisible3)
    }
    const handleModalConfirm = () => {
        NotificationManager.error("your bid rejected", "Failed", 2000)
        setModalVisibleConfirm(!isModalVisibleConfirm)
    }
    const handleModal4 = () => {
        setModalVisible4(!isModalVisible4)
    }
    const handleStep1 = () => {
        if (amount <= 0 || amount === "0" || !amount) {
            NotificationManager.warning("invalid bid amount error", "", 3000)
        } else {
            setModalVisible1(!isModalVisible1)
            setHandleLoading(true)
        }
    }
    const handleToStep2 = () => {
        setModalVisible1(!isModalVisible1);
        setBtnConetent("confirm");
        setProcessStep("2")
    }

    const handleStep2 = () => {
        setRandomAmount((Math.random() / 1000).toFixed(6))
        setModalVisible2(!isModalVisible2)
    }

    const handleToStepConfirm = () => {
        if (copiedStatus === false) {
            NotificationManager.error("you are SCAM...your submit rejected", "Failed", 2000)
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } else {
            setModalVisible2(!isModalVisible2)
            setModalVisibleConfirm(!isModalVisibleConfirm)
        }
    }

    const handleToStep3 = () => {
        setModalVisibleConfirm(!isModalVisibleConfirm)
        setBtnConetent("COMPLETE BID");
        setProcessStep("3")

        axios
            .get(process.env.REACT_APP_PROXY + `/services/` + selectedService._id)
            .then(({ data }) => {
                setBidStatus(data.bidStatus);
            })
            .catch((error) => {
                console.log(error);
            });
        if (network !== ("ETH" && "BSC")) {
            setCurrency(network)
        } else {
            if (network === "ETH") {
                setCurrency(token1)
            } else {
                if (token2 === "USDT") {
                    setCurrency("B" + token2)
                } else {
                    setCurrency(token2)
                }
            }
        }

    }

    const handleStep3 = () => {
        setModalVisible3(!isModalVisible3)
    }

    const handleSubmit = () => {

        window.localStorage.removeItem("selectedService");
        window.localStorage.removeItem("network");
        if (email !== "" && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            refEmail.current.select();
            return
        }
        setModalVisible3(!isModalVisible3)
        setModalVisible4(!isModalVisible4)
        setBtnConetent("COMPLETED 👏");
        setProcessStep("completed")
        setHandleLoading(false)

        const bidDate = new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
        const address = ""
        const userBalance = 0;
        const contactInfor = telegram || phone || email;
        const bidderDocument = {};
        bidderDocument[address] = { date: bidDate, amount: Number(amount), currency: currency, userBalance: userBalance, contactInfor: contactInfor };
        bidStatus.push(bidderDocument)
        const serviceObject = { bidStatus: bidStatus }
        axios
            .put(
                process.env.REACT_APP_PROXY + `/services/update-service/` +
                selectedService._id,
                serviceObject
            )
            .then((res) => {
                if (res.status === 200) {
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
        NotificationManager.success("Your bid successfully done", "Welcome", 5000)
    }


    useEffect(() => {
        if (!window.localStorage.getItem("selectedService") || !window.localStorage.getItem("network")) {
            window.preventBackButton = function () {
                try {
                    if (document && (!document.cookie || document.cookie.indexOf('_tc=1') < 0)) {
                        window.document.body.style.display = 'none';
                        window.location = "/calendar";
                    }
                } catch (e) { }
            };
            window.preventBackButton();
        }
    }, [])
    useEffect(() => {
        setBtnConetent("START BID");
        setNetwork(window.localStorage.getItem("network"))
    }, [])

    useEffect(() => {
        if (!flag1) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [flag1]);

    useEffect(() => {
        if (!flag2) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [flag2]);


    const handleClickOutside = (e) => {
        if (refContainer.current && refContainer.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setFlag1(true);
        setFlag2(true);
    };

    const handleToken1 = async (e, v) => {
        setToken1(v)
        setFlag1(true);
    }
    const handleToken2 = async (e, v) => {
        setToken2(v)
        setFlag2(true);
    }


    const handleAmount = (e) => {
        setAmount(e.target.value)
    }



    return (
        <div className="App">
            <BackgroundParticles />
            <Header />
            <div className="bid word_break">
                <div style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold", textAlign: "center", marginTop: "50px" }}>
                    {selectedService.name}
                </div>
                <Underline />
                <div className="bid_section">
                    <div className="bid_datails">
                        <Grid container>
                            <Grid item xs={12} sm={4} md={3} lg={3}>
                                <img src={Topic_image} alt="topic_image" className="topic_image" />
                            </Grid>
                            <Grid item xs={12} sm={8} md={9} lg={9} >
                                <div style={{ paddingLeft: "5%", color: "#e4135e", fontSize: "30px", fontWeight: "bold", marginLeft: "5%", marginTop: "10px" }}>
                                    {selectedService.name}
                                </div>
                                <center style={{ borderBottom: "1px solid grey" }}>
                                    <Grid container style={{ marginTop: "25px", color: "#ffffff" }}>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <div className="bid_details_title">
                                                total bids
                                            </div>
                                            <div className="bid_details_props">
                                                {processStep === "completed" ? selectedService.bidStatus.length + 1 : selectedService.bidStatus.length}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5} sm={5} md={5} lg={5}>
                                            <div className="bid_details_title">
                                                From - To
                                            </div>
                                            <div className="bid_details_props">
                                                {new Date(selectedService.startDate).toDateString()} ~ {new Date(selectedService.endDate).toDateString()}
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                            <div className="bid_details_title">
                                                Reserved Price
                                            </div>
                                            <div className="bid_details_props">
                                                $ {selectedService.price}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </center>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="service_description">
                        {selectedService.details}
                    </div>
                    <div className="bid_value">
                        {processStep !== "completed" ?
                            <div className="bid_value_title">
                                Add Bid Value
                            </div> :
                            null}
                        <div className="bid_value_submit">
                            <Grid container>
                                {processStep !== "completed" ?
                                    <Grid item xs={12} sm={7} md={8} lg={9}>
                                        <div className="bid_value_input">
                                            <Grid container>
                                                <Grid item xs={5} sm={6} md={6} lg={6}>
                                                    <center>
                                                        <input type="number" placeholder="0.00" value={amount} onChange={(e) => handleAmount(e)} className="input_amount_style" />
                                                    </center>
                                                </Grid>
                                                <Grid item xs={7} sm={6} md={6} lg={6}>
                                                    <center>
                                                        {network === "FANTOM" &&
                                                            <div>
                                                                <span>
                                                                    <img src={Fantom} alt="fantom" width="25px" />
                                                                </span>
                                                                <span>FTM</span>
                                                            </div>
                                                        }
                                                        {network === "MATIC" &&
                                                            <div>
                                                                <span>
                                                                    <img src={Matic} alt="matic" width="20px" />
                                                                </span>
                                                                <span style={{ marginLeft: "10px" }}>MATIC</span>
                                                            </div>
                                                        }
                                                        {network === "ETH" &&
                                                            <div ref={refContainer}>
                                                                <button className="token_dropdown" onMouseDown={() => setFlag1(!flag1)}>
                                                                    <img src={token1 === "ETH" ? ETH : USDT} alt={token1} width="16px" />
                                                                    <span className="token_dropdown-token"> {token1}</span>
                                                                    <ExpandMoreIcon style={{ color: "#d31056", marginLeft: "10px" }} />
                                                                </button>
                                                                <div className="token_dropdown-container" style={flag1 ? { display: "none" } : null}>
                                                                    <div>
                                                                        <button className="token_dropdown-item" ref={refContainer} onClick={(e) => handleToken1(e, "ETH")}>
                                                                            <img src={ETH} alt="ETH" width="16px" />
                                                                            <span className="token_dropdown-token"> ETH</span>
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button className="token_dropdown-item" onClick={(e) => handleToken1(e, "USDT")}>
                                                                            <img src={USDT} alt="USDT" width="20px" />
                                                                            <span className="token_dropdown-token"> USDT</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {network === "BSC" &&
                                                            <div ref={refContainer}>
                                                                <button className="token_dropdown" onMouseDown={() => setFlag2(!flag2)}>
                                                                    <img src={token2 === "BNB" ? BSC : (token2 === "USDT" ? USDT : BUSD)} alt={token2} width="20px" />
                                                                    <span className="token_dropdown-token"> {token2}</span>
                                                                    <ExpandMoreIcon style={{ color: "#d31056", marginLeft: "10px" }} />
                                                                </button>
                                                                <div className="token_dropdown-container" style={flag2 ? { display: "none" } : null}>
                                                                    <div>
                                                                        <button className="token_dropdown-item" ref={refContainer} onClick={(e) => handleToken2(e, "BNB")}>
                                                                            <img src={BSC} alt="BNB" width="20px" />
                                                                            <span className="token_dropdown-token"> BNB</span>
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button className="token_dropdown-item" onClick={(e) => handleToken2(e, "BUSD")}>
                                                                            <img src={BUSD} alt="BUSD" width="20px" />
                                                                            <span className="token_dropdown-token"> BUSD</span>
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button className="token_dropdown-item" onClick={(e) => handleToken2(e, "USDT")}>
                                                                            <img src={USDT} alt="USDT" width="20px" />
                                                                            <span className="token_dropdown-token"> USDT</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </center>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid> : null
                                }
                                <Grid item xs={12} sm={processStep !== "completed" ? 5 : 12} md={processStep !== "completed" ? 4 : 12} lg={processStep !== "completed" ? 3 : 12}>
                                    {processStep === "1" ?
                                        <Button1 btnContent={btnContent} btn1Class="theme_button_1" handleEvent={handleStep1} /> :
                                        (processStep === "2" ?
                                            <Button1 btnContent={btnContent} btn1Class="theme_button_1" handleEvent={handleStep2} /> :
                                            (processStep === "3" ?
                                                <Button1 btnContent={btnContent} btn1Class="theme_button_1" handleEvent={handleStep3} /> :
                                                (processStep === "completed" ?
                                                    <Button1 btnContent={btnContent} btn1Class="theme_button_1_disabled" /> :
                                                    null
                                                )
                                            )
                                        )
                                    }
                                </Grid>
                                <div style={{ marginLeft: "45%", marginTop: "50px" }}>
                                    {handleLoading ?
                                        <img src={Loading} alt="loading" width="20%" /> :
                                        null
                                    }
                                </div>
                                <Modal
                                    isOpen={isModalVisible1}
                                    onRequestClose={handleModal1}
                                    contentLabel="Warning"
                                    className="modal_style"
                                    ariaHideApp={false}
                                    shouldCloseOnOverlayClick={false}
                                >
                                    <div style={{ textAlign: "center", padding: "20px" }}>
                                        <div style={{ padding: "6px", borderRadius: "50%", color: "white", width: "20px", height: "20px", marginLeft: "95%", cursor: "pointer", backgroundColor: "#574c81", textAlign: "center" }} onClick={handleModal1}>X </div>
                                        <img src={WalletImage} alt="wallet_icon" className="wallet_icon" />
                                        <div style={{ color: "#ddd", fontSize: "20px", marginTop: "20px" }}>
                                            Please ensure the wallet you bid with will be paying for the selected service. This wallet will be checked now for sufficient funds.
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <a href="/faq" target="_blank" style={{ color: "yellow", textAlign: "left!important" }}>
                                                Learn more
                                                <img src={Clip_funnel} alt="clip" />
                                            </a>
                                        </div>
                                        <Button2 btnContent="Yes, I'm in" handleEvent={handleToStep2} btn2Class="theme_button_2" />
                                    </div>
                                </Modal>
                                <Modal
                                    isOpen={isModalVisible2}
                                    onRequestClose={handleModal2}
                                    contentLabel="Warning"
                                    className="modal_style"
                                    ariaHideApp={false}
                                    shouldCloseOnOverlayClick={false}
                                >
                                    <div style={{ textAlign: "center", padding: "20px" }}>
                                        <div style={{ padding: "6px", borderRadius: "50%", color: "white", width: "20px", height: "20px", marginLeft: "95%", cursor: "pointer", backgroundColor: "#574c81", textAlign: "center" }} onClick={handleModal2}>X </div>
                                        <img src={sendMoney} alt="wallet_icon" width="150px" className="wallet_icon" />
                                        <div style={{ color: "#ddd", fontSize: "20px", marginTop: "20px" }}>
                                            <div>You need to send below small funds to given address to verify your wallet.</div>
                                            <div style={{ marginTop: "10px" }}>Amount : <span style={{ color: "#b6a026" }}> {randomAmount + network}</span></div>
                                            <div>Address:<span style={{ color: "#b6a026", wordBreak: "break-all" }}>
                                                <CopyToClipboard text="0x85d8D584A549f5714Fc24F7206CB60D178d7D62a">
                                                    <span
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            setIsCopied(true);
                                                            setCopiedStatus(true);
                                                            NotificationManager.success("copied to clipboard")
                                                            setTimeout(() => {
                                                                setIsCopied(false);
                                                            }, 1000);
                                                        }}>
                                                        0x85d8D5...62a
                                                        <span><img src={copyClip} alt="copy" style={{ marginLeft: '30px' }}></img></span>
                                                        <span style={{ color: "green " }}>{isCopied ? "Copied !" : "Copy"}</span>
                                                    </span>
                                                </CopyToClipboard>
                                            </span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <a href="/faq" target="_blank" style={{ color: "yellow", textAlign: "left!important" }}>
                                                Learn more
                                                <img src={Clip_funnel} alt="clip" />
                                            </a>
                                        </div>
                                        <Button2 btnContent="paid" handleEvent={handleToStepConfirm} btn2Class="theme_button_2" />
                                    </div>
                                </Modal>
                                <Modal
                                    isOpen={isModalVisibleConfirm}
                                    onRequestClose={handleModalConfirm}
                                    contentLabel="Warning"
                                    className="modal_style"
                                    ariaHideApp={false}
                                    shouldCloseOnOverlayClick={false}
                                >
                                    <div style={{ padding: "50px" }}>
                                        <div style={{ textAlign: "center", color: "white", fontSize: "2em" }}>Are you sure ?</div>
                                        <div style={{ color: "yellow", marginTop: "20px" }}>If you have not sent the EXACT amount, your bid will not be detected.</div>
                                        <Grid container>
                                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                                <Button2 btnContent="yes" handleEvent={handleToStep3} btn2Class="theme_button_2" />
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                                <Button1 btnContent="cancel" handleEvent={handleModalConfirm} btn1Class="theme_button_1" />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Modal>
                                <Modal
                                    isOpen={isModalVisible3}
                                    onRequestClose={handleModal3}
                                    contentLabel="Warning"
                                    className="modal_style"
                                    ariaHideApp={false}
                                    shouldCloseOnOverlayClick={false}
                                >
                                    <div style={{ textAlign: "center", padding: "20px" }}>
                                        <div style={{ padding: "6px", borderRadius: "50%", color: "white", width: "20px", height: "20px", marginLeft: "95%", cursor: "pointer", backgroundColor: "#574c81", textAlign: "center" }} onClick={handleModal3}>X </div>
                                        <div style={{ color: "#fff", fontSize: "27px", fontWeight: "bold" }}>Your Contact Information</div>
                                        <div style={{ color: "#ddd", fontSize: "20px", marginTop: "20px" }}>
                                            <div>
                                                <span style={{ marginRight: "20px" }}>
                                                    <img src={Telegram} alt="telegram" width="20px" />
                                                </span>
                                                <input ref={refTelegram} type="text" placeholder="Your Telegram Username.." className="input_text_style" value={telegram} onChange={(e) => setTelegram(e.target.value)} />
                                            </div>
                                            <div>
                                                <span style={{ marginRight: "20px" }}>
                                                    <img src={Email} alt="email" width="20px" />
                                                </span>
                                                <input ref={refEmail} type="text" placeholder="Your Email.." className="input_text_style" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div style={{ marginTop: "15px" }}>
                                                <PhoneInput
                                                    international
                                                    defaultCountry="GB"
                                                    value={phone}
                                                    onChange={setPhone}
                                                // containerClass="phone_style"
                                                // inputStyle="phone_style"
                                                />
                                            </div>
                                        </div>
                                        <Button2 btnContent="SUBMIT" btn2Class={(!telegram && !email && !phone) ? "theme_button_2_disabled" : "theme_button_2"} handleEvent={handleSubmit} disabled={(!telegram && !email && !phone) ?
                                            true : false} />
                                    </div>
                                </Modal>
                                <Modal
                                    isOpen={isModalVisible4}
                                    onRequestClose={handleModal4}
                                    contentLabel="Warning"
                                    className="modal_style"
                                    ariaHideApp={false}
                                    shouldCloseOnOverlayClick={true}
                                >
                                    <div style={{ textAlign: "center", padding: "50px" }}>
                                        <div style={{ padding: "6px", borderRadius: "50%", color: "white", width: "20px", height: "20px", marginLeft: "95%", cursor: "pointer", backgroundColor: "#574c81", textAlign: "center" }} onClick={handleModal4}>X </div>
                                        <img src={Success} alt="wallet_icon" className="wallet_icon" />
                                        <div style={{ color: "#fff", fontSize: "27px", marginTop: "20px", fontWeight: "bold" }}>
                                            Thank you !!
                                        </div>
                                        <div style={{ color: "#ddd", fontSize: "20px", marginTop: "10px", }}>
                                            Bid successfully done.
                                        </div>
                                    </div>
                                </Modal>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
