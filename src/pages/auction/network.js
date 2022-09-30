import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import '../../main.css'
import BackgroundParticles from '../../components/particles'

import bsc from '../../assets/img/bsc.png'
import eth from '../../assets/img/eth.png'
import matic from '../../assets/img/matic.png'
import fantom from '../../assets/img/fantom.png'
import network_image from '../../assets/img/network_image.png'
import next_button from '../../assets/img/next_2.png'

import Header from '../../components/header'
import Footer from '../../components/footer'

export default function NetworkPage() {

    const [network, setNetwork] = useState(null);

    const handleBSC = () => {
        setNetwork("BSC")
        window.localStorage.setItem("network", "BSC")
    }
    const handleETH = () => {
        setNetwork("ETH")
        window.localStorage.setItem("network", "ETH")
    }
    const handleMATIC = () => {
        setNetwork("MATIC")
        window.localStorage.setItem("network", "MATIC")
    }
    const handleFANTOM = () => {
        setNetwork("FANTOM")
        window.localStorage.setItem("network", "FANTOM")
    }

    return (
        <div className="network App">
            <BackgroundParticles />
            <Header />
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <div className="network_reveal">
                        <img className="network_image" src={network_image} alt="network_image" />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <div className="network-title-1">
                        Which Network
                    </div>
                    <div className="network-title-2">
                        Are you interested in ?
                    </div>
                    <div>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <button className="network_button" onClick={handleBSC}>
                                    <img src={bsc} alt="bsc" style={{ width: "40px", height: "40px" }} />
                                    <span className="networks"> BSC</span>
                                    {network === "BSC" ?
                                        <span style={{ color: "green", fontSize: "40px", marginLeft: "30px" }}>✔</span> : null
                                    }
                                </button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <button className="network_button" onClick={handleETH}>
                                    <img src={eth} alt="eth" style={{ width: "25px", height: "40px" }} />
                                    <span className="networks"> ETH</span>
                                    {network === "ETH" ?
                                        <span style={{ color: "green", fontSize: "40px", marginLeft: "30px" }}>✔</span> : null
                                    }
                                </button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <button className="network_button" onClick={handleMATIC}>
                                    <img src={matic} alt="matic" style={{ width: "40px", height: "40px" }} />
                                    <span className="networks"> MATIC</span>
                                    {network === "MATIC" ?
                                        <span style={{ color: "green", fontSize: "40px", marginLeft: "30px" }}>✔</span> : null
                                    }
                                </button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <button className="network_button" onClick={handleFANTOM}>
                                    <img src={fantom} alt="fantom" style={{ width: "40px", height: "40px" }} />
                                    <span className="networks"> FANTOM</span>
                                    {network === "FANTOM" ?
                                        <span style={{ color: "green", fontSize: "40px", marginLeft: "30px" }}>✔</span> : null
                                    }
                                </button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <div className="next">
                {network === null ?
                    <img src={next_button} alt="next_button" className="next_button_disabled" /> :
                    <Link to="/calendar">
                        <img src={next_button} alt="next_button" className="next_button" />
                    </Link>
                }
            </div>
            <Footer />
        </div>
    )
}
