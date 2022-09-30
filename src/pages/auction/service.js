import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';

import BackgroundParticles from '../../components/particles'
import '../../main.css'

import service_image from '../../assets/img/service_image.png'
import next_button from '../../assets/img/next_2.png'
import { Button1 } from '../../components/theme';
import { Button2 } from '../../components/theme';

import Header from '../../components/header'
import Footer from '../../components/footer'

export default function ServicePage() {

    const [isModalVisible, setModalVisible] = useState(false);
    const [select, setSelect] = useState(false);

    const [btnContent1, setBtnContent1] = useState("");
    const [btnContent2, setBtnContent2] = useState("");
    const [btnContent3, setBtnContent3] = useState("");
    const [btnContent4, setBtnContent4] = useState("");

    useEffect(() => {
        setBtnContent1("OPTION A");
        setBtnContent2("OPTION B");
        setBtnContent3("OPTION C");
        setBtnContent4("OPTION D");
    }, []);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: "#222127",
            border: "0.75pt solid #333333"
        },
    };

    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    const handleSelect = () => {
        setSelect(true)
        setBtnContent3("OPTION C 👌");
    }
    return (
        <div className="App">
            <BackgroundParticles style={{ height: "100%" }} />
            <Header />
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <div className="welcome_reveal">
                        <img className="service_image" src={service_image} alt="welcome_image" />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <div className="service">
                        <div className="service-title-1">
                            Which Service
                        </div>
                        <div className="service-title-2">
                            Are you interested in ?
                        </div>
                        <div className="services">
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} >
                                    <Button1 btnContent={btnContent1} btn1Class="theme_button_1" className="option_A" handleEvent={handleModal} /><br />
                                </Grid>
                                <Modal
                                    isOpen={isModalVisible}
                                    // onAfterOpen={afterOpenModal}
                                    onRequestClose={handleModal}
                                    style={customStyles}
                                    ariaHideApp={false}
                                    contentLabel="COMING SOON"
                                >
                                    <div style={{ textAlign: "center", padding: "20px" }}>
                                        <div style={{ textAlign: "end", color: "white", width: "3%", marginLeft: "97%", cursor: "pointer" }} onClick={handleModal}> X </div>
                                        <h1 style={{ color: "grey" }}>COMING SOON</h1>
                                        <div style={{ color: "#ddd", fontSize: "20px" }}>
                                            For now, it is desabled, but No worry.<br />
                                            We will be coming soon !
                                        </div>
                                    </div>
                                </Modal>
                                <Grid item xs={12} sm={12} md={6} lg={6} >
                                    <Button1 btnContent={btnContent2} btn1Class="theme_button_1" className="option_B" handleEvent={handleModal} /><br />
                                </Grid>
                                <Modal
                                    isOpen={isModalVisible}
                                    // onAfterOpen={afterOpenModal}
                                    onRequestClose={handleModal}
                                    style={customStyles}
                                    ariaHideApp={false}
                                    contentLabel="COMING SOON"
                                >
                                    <div style={{ textAlign: "center", padding: "20px" }}>
                                        <div style={{ textAlign: "end", color: "white", width: "3%", marginLeft: "97%", cursor: "pointer" }} onClick={handleModal}> X </div>
                                        <h1 style={{ color: "grey" }}>COMING SOON</h1>
                                        <div style={{ color: "#ddd", fontSize: "20px" }}>
                                            For now, it is desabled, but No worry.<br />
                                            We will be coming soon !
                                        </div>
                                    </div>
                                </Modal>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6} >
                                    <Button2 btnContent={btnContent3} btn2Class="theme_button_2" className="option_C" handleEvent={handleSelect} />
                                    {/* {select === false ? null :
                                        <span style={{ color: "green" }}> ✔</span>
                                    } */}
                                    <br />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Button1 btnContent={btnContent4} btn1Class="theme_button_1" className="option_D" handleEvent={handleModal} />
                                </Grid>
                                <Modal
                                    isOpen={isModalVisible}
                                    onRequestClose={handleModal}
                                    style={customStyles}
                                    ariaHideApp={false}
                                    contentLabel="COMING SOON"
                                >
                                    <div style={{ textAlign: "center", padding: "20px" }}>
                                        <div style={{ textAlign: "end", color: "white", width: "3%", marginLeft: "97%", cursor: "pointer" }} onClick={handleModal}> X </div>
                                        <h1 style={{ color: "grey" }}>COMING SOON</h1>
                                        <div style={{ color: "#ddd", fontSize: "20px" }}>
                                            For now, it is desabled, but No worry.<br />
                                            We will be coming soon !
                                        </div>
                                    </div>
                                </Modal>
                            </Grid>
                        </div>
                    </div>
                    <div className="next">
                        {select === false ?
                            <img src={next_button} alt="next_button" className="next_button_disabled" /> :
                            <Link to="/networks">
                                <img src={next_button} alt="next_button" className="next_button" />
                            </Link>
                        }

                    </div>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}