import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Modal from 'react-modal';
import axios from 'axios';
import { NotificationManager } from "react-notifications";

import BackgroundParticles from '../../components/particles'
import AdminLeftBarProps from '../../components/adminLeftProps'
import ServiceTableRow from '../../components/serviceTableRow'


export default function EditService() {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [details, setDetails] = useState("")
    const [topicImage, setTopicImage] = useState("")
    const [isModalVisible, setModalVisible] = useState(false);

    const [services, setServices] = useState([]);


    useEffect(() => {
        axios
            .get(process.env.REACT_APP_PROXY + `/services/`)
            .then(({ data }) => {
                setServices(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    const DataTable = () => {
        return services.map((res, i) => {
            return <ServiceTableRow obj={res} key={i} />;
        });
    };


    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    const handleImage = (e) => {
        console.log(e.target.files[0])
        // const Img = window.localStorage.setItem("topicImage", URL.createObjectURL(e.target.files[0]))
        setTopicImage(e.target.files[0])
    }
    const saveService = () => {
        if (startDate > endDate || new Date().getTime() >= new Date(startDate).getTime()) {
            setEndDate("")
            setStartDate("")
            NotificationManager.error("Invalid date setting error", "Failed", 3000);
            return
        } else {
            const serviceObject = { name, price, startDate, endDate, details, topicImage, bidStatus: [] }
            axios.post(
                process.env.REACT_APP_PROXY + `/services/create-service`,
                serviceObject)
                .then(res => {
                    if (res.status === 200) {
                        NotificationManager.success("Service created successfully", "Success", 1500);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)
                    }
                    else
                        Promise.reject()
                })
                .catch(err => NotificationManager.error("Something went wrong", "Oops", 3000))
        }
        setModalVisible(false)
    }

    const handleEdit = () => {
        setModalVisible(!isModalVisible)
    }

    const cancelEdit = () => {
        setModalVisible(!isModalVisible)
        setName("")
        setPrice(0)
        setDetails("")
        setTopicImage("")
        setStartDate(null)
        setEndDate(null)
    }

    return (
        <div className="winner_record admin_padding">
            <BackgroundParticles />
            <Grid container>
                <Grid item md={4} lg={3} >
                    <AdminLeftBarProps />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                    <div style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold" }}>EDIT SERVICES</div>
                    <div className="add_service_button" onClick={handleEdit} >Add Service</div>
                    <div id="Bid-record" style={{ marginTop: "50px" }}>
                        <table className="table table-striped css-serial"  >
                            <thead>
                                <tr>
                                    <th style={{ borderRadius: "15px 0 0 15px" }}>ID</th>
                                    <th>ServiceName</th>
                                    <th>Price</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th>TopicImage</th>
                                    <th style={{ borderRadius: "0 15px 15px 0" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DataTable()}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        isOpen={isModalVisible}
                        onRequestClose={handleModal}
                        contentLabel="Warning"
                        className="modal_style"
                        ariaHideApp={false}
                        shouldCloseOnOverlayClick={false}
                    >
                        <div className="edit_service_pad">
                            <div>
                                <span>Service Name: </span>
                                <input type="text" placeholder="name..." value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <span>Price($): </span>
                                <input type="number" placeholder="price..." value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div>
                                <span>Available Date: </span>
                                <span><input type="date" placeholder="from" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></span> ~
                                <span><input type="date" placeholder="to" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></span>
                            </div>
                            <div>
                                <span>Details: </span>
                                <textarea placeholder="please explain about this service here..." value={details} onChange={(e) => setDetails(e.target.value)} />
                            </div>
                            <div>
                                <span>Topic Image: </span>
                                {!topicImage ?
                                    <input type="file" name="topicImage" onChange={handleImage} /> :
                                    null
                                }
                                <img src={topicImage ? URL.createObjectURL(topicImage) : null} alt={topicImage ? topicImage.name : null} width="150px" />
                            </div>
                            <button onClick={saveService} disabled={(name && price && startDate && endDate && details && topicImage) ? false : true} >Save</button>
                            <button onClick={cancelEdit} >Cancel</button>
                        </div>
                    </Modal>
                </Grid>
            </Grid>
        </div>
    )
}