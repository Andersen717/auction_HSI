import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import slice from "../../redux_model/reducer"
import { NotificationManager } from 'react-notifications'

import Calendar from 'react-calendar'
import './Calendar.css';

import BackgroundParticles from '../../components/particles'
import { Underline } from '../../components/theme'
import { Button1 } from '../../components/theme'
import { Button1Left } from '../../components/theme';
import next_button from '../../assets/img/next_2.png'
import faq_icon from '../../assets/img/faq.png'

import Header from '../../components/header'
import Footer from '../../components/footer'

import '../../main.css'

const CalendarPage = () => {
    const dispatch = useDispatch();
    const update = (json) => dispatch(slice.actions.update(json));

    const [timeslot1, setTimeslot1] = useState("")
    const [timeslot2, setTimeslot2] = useState("")
    const [timeslot3, setTimeslot3] = useState("")
    const [timeslot4, setTimeslot4] = useState("")
    const [timeslot5, setTimeslot5] = useState("")
    const [timeslot6, setTimeslot6] = useState("")
    const [selected, setSelected] = useState(false)

    const [date, setDate] = useState(new Date());
    const [services, setServices] = useState([]);
    const [theServices, setTheServices] = useState([]);
    const [showServices, setShowServices] = useState([]);
    const currentDate = new Date();

    useEffect(() => {

        setTimeslot1("8:00 AM - 10:00 AM")
        setTimeslot2("11:00 AM - 12:00 PM")
        setTimeslot3("12:00 PM - 2:00 PM")
        setTimeslot4("5:00 PM - 8:00 PM")
        setTimeslot5("8:00 PM - 10:00 PM")
        setTimeslot6("11:00 PM - 12:00 AM")

        axios
            .get(process.env.REACT_APP_PROXY + `/services/`)
            .then(({ data }) => {
                setServices(data);
            })
            .catch((error) => {
                console.log(error);
            });

        if (!window.localStorage.getItem("network")) {
            window.preventBackButton = function () {
                try {
                    if (document && (!document.cookie || document.cookie.indexOf('_tc=1') < 0)) {
                        window.document.body.style.display = 'none';
                        window.location = "/networks";
                    }
                } catch (e) { }
            };
            window.preventBackButton();
        }
    }, [date])

    const selectDate = (val) => {
        setSelected(false)
        setDate(val);
        setTheServices([])
        for (let i = 0; i < services.length; i++) {
            if (val > new Date(services[i].startDate) && val < new Date(services[i].endDate)) {
                theServices.push(services[i])
            }
            if (((val.getDate() === new Date(services[i].startDate).getDate()) && (val.getMonth() === new Date(services[i].startDate).getMonth())) ||
                ((val.getDate() === new Date(services[i].endDate).getDate()) && (val.getMonth() === new Date(services[i].endDate).getMonth()))) {
                for (let i = 0; i < theServices.length; i++) {
                    if (!services[i] && theServices[i] !== services[i]) {
                        theServices.push(services[i])
                    }
                }
            }
        }
        if (theServices.length === 1) {
            update({ selectedService: theServices[0] })
        }
        if (theServices.length === 0) {
            NotificationManager.warning("No available service", "Alam", 1500)
        }
        setShowServices(theServices)
    }

    const selectService = (i) => {
        setSelected(true)
        update({ selectedService: i })
    }
    return (
        <div className="App" style={{ color: "white" }}>
            <BackgroundParticles />
            <Header />
            <div className="select_date">
                <div className="select_date_title">
                    Select Date
                </div>
                <Underline />
                <div className="select_date_calendar">
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <center>
                                <Calendar
                                    onChange={selectDate}
                                    value={date}
                                />
                                <p className='text-center'>
                                    {date.toDateString()}
                                </p>

                                {date.toDateString() === currentDate.toDateString() ?
                                    <p className='text-center bold' style={{ color: "lightgreen", fontSize: "20px" }}>
                                        already finished bid for Today's service.</p> :
                                    (date.getDate() < currentDate.getDate()) ?
                                        <p className='text-center bold' style={{ color: "red", fontSize: "20px" }}>
                                            something went wrong!</p> :
                                        (date.getTime() < currentDate.setDate(currentDate.getDate() + 14) ?
                                            <p className='text-center bold' style={{ color: "yellow", fontSize: "20px" }}>
                                                you can bid for that day. </p> :
                                            <p className='text-center bold' style={{ color: "lightgreen", fontSize: "20px" }}>
                                                we are sorry, but not ready yet for that day.</p>)
                                }
                            </center>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <div className="time_slot">
                                <div className="time_slot_title">
                                    <div style={{ fontSize: "30px" }}>Available Timeslots</div>
                                    <div className="time_slot_title_date">
                                        <span style={{ color: "#c70c60" }}>26 December </span>
                                        <span> 2021</span>
                                    </div>
                                </div>
                                <div>
                                    <Grid container style={{ width: "100%" }}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Button1Left btnContent={timeslot1} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Button1Left btnContent={timeslot2} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Button1Left btnContent={timeslot3} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Button1Left btnContent={timeslot4} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Button1Left btnContent={timeslot5} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Button1Left btnContent={timeslot6} />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className="select_service">
                <div className="select_service_title">
                    Available Services
                </div>
                <Underline />
                <Grid container style={{ width: "80%", marginLeft: "10%", marginTop: "50px" }}>
                    {showServices.length === 0 ?
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button1 btnContent="No available Service" btn1Class="theme_button_2" />
                        </Grid> :
                        showServices.map((item, key) => {
                            return <Grid key={key} item xs={12} sm={6} md={6} lg={4}>
                                <Button1
                                    btnContent={item.name.length > 10
                                        ? item.name.slice(0, 10) + "..."
                                        : item.name} btn1Class="theme_button_1_focus"
                                    handleEvent={() => selectService(item)} />
                            </Grid>
                        })
                    }

                </Grid>
            </div>
            {showServices.length !== 0 ?
                (!selected && showServices.length !== 1 ?
                    <div style={{ color: "yellow", fontSize: "35px", textAlign: "center", padding: "30px" }}>Please Select Service you want...</div> :
                    <div className="next">
                        <Link to="/bid">
                            <img src={next_button} alt="next_button" className="next_button" />
                        </Link>
                    </div>
                ) : null
            }
            <div style={{ cursor: "pointer" }}>
                <Link to="/faq" >
                    <img src={faq_icon} alt="faq_icon" className="faq_icon" />
                    <span className="faq_text">FAQ</span>
                </Link>
            </div>
            <Footer />
        </div>
    )
}

export default CalendarPage;