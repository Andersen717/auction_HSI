import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import Calendar from 'react-calendar'
import axios from 'axios'

import './adminCalendar.css'

import BackgroundParticles from '../../components/particles'
import AdminLeftBarProps from '../../components/adminLeftProps'

import Tick from '../../assets/img/tick.png'
import Winner from '../../assets/img/winner.png'
import Amount from '../../assets/img/money.png'
import Account from '../../assets/img/account.png'

export default function Dashboard() {

    const [services, setServices] = useState({})
    const [bidTotalAmount, setBidTotalAmount] = useState(0)
    const [winnerAmount, setWinnerAmount] = useState(0)
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_PROXY + `/services/`)
            .then(({ data }) => {
                setServices(data);
                var bidTotalAmount = 0;
                var winnerAmount = 0;
                for (let i = 0; i < data.length; i++) {
                    var num = data[i].bidStatus.length;
                    if (num > 0) {
                        winnerAmount += 1;
                    }
                    bidTotalAmount += num;
                }
                setWinnerAmount(winnerAmount)
                setBidTotalAmount(bidTotalAmount)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className="admin_dashboard admin_padding">
            <BackgroundParticles />
            <Grid container>
                <Grid item md={4} lg={3} >
                    <AdminLeftBarProps />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                    <div style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold" }}>Dashboard</div>
                    <div>
                        <Grid container >
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className="total_counter_card total_amount">
                                    <Grid container>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <img src={Amount} alt="tick" className="total_counter_card_icon" />
                                        </Grid>
                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                            <div className="total_counter_card_title">
                                                Total Services Record
                                            </div>
                                            <div className="total_counter_card_amount">
                                                {services.length ? services.length : 0}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className="total_counter_card total_bid">
                                    <Grid container>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <img src={Tick} alt="tick" className="total_counter_card_icon" />
                                        </Grid>
                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                            <div className="total_counter_card_title">
                                                Total Bid Record
                                            </div>
                                            <div className="total_counter_card_amount">
                                                {bidTotalAmount}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className="total_counter_card total_winner">
                                    <Grid container>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <img src={Winner} alt="Winner" className="total_counter_card_icon" />
                                        </Grid>
                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                            <div className="total_counter_card_title">
                                                Total Winner Record
                                            </div>
                                            <div className="total_counter_card_amount">
                                                {winnerAmount}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className="total_counter_card total_account">
                                    <Grid container>
                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                            <img src={Account} alt="tick" className="total_counter_card_icon" />
                                        </Grid>
                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                            <div className="total_counter_card_title">
                                                Admin Accounts
                                            </div>
                                            <div className="total_counter_card_amount">
                                                1
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <center className="admin_calendar">
                        <Calendar />
                    </center>
                </Grid>
            </Grid>
        </div>
    )
}