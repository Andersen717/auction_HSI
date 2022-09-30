import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import { NotificationManager } from 'react-notifications';

export default function ServiceTableRow(props) {
    const { _id, name, price, startDate, endDate, details, topicImage, bidStatus } = props.obj;
    const [name1, setName] = useState("")
    const [price1, setPrice] = useState(0)
    const [startDate1, setStartDate] = useState(new Date())
    const [endDate1, setEndDate] = useState(new Date())
    const [details1, setDetails] = useState("")
    const [topicImage1, setTopicImage] = useState("")
    const [cDate, setCDate] = useState(new Date())
    const [isModalVisible, setModalVisible] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    useEffect(() => {
        let currentDate = new Date();
        setCDate(currentDate)
        setName(name)
        setPrice(price)
        setStartDate(startDate)
        setEndDate(endDate)
        setDetails(details)
        setTopicImage(topicImage)
    }, [name, price, startDate, endDate, details, topicImage]);


    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    const handleEdit = () => {
        setModalVisible(!isModalVisible)
    }
    const handleImage = (e) => {
        console.log(e.target.files[0])
        // const Img = window.localStorage.setItem("topicImage", URL.createObjectURL(e.target.files[0]))
        setTopicImage(e.target.files[0])
    }

    const updateService = () => {
        const serviceObject = { name: name1, price: price1, startDate: startDate1, endDate: endDate1, details: details1, topicImage: topicImage1 }
        axios
            .put(
                process.env.REACT_APP_PROXY + `/services/update-service/` +
                _id,
                serviceObject
            )
            .then((res) => {
                if (res.status === 200) {
                    NotificationManager.success("Service successfully updated !", "Success", 1500)
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                } else Promise.reject();
            })
            .catch((err) => NotificationManager.error("Something went wrong !", "Oops", 2000));
        setModalVisible(false)
    }
    const deleteService = () => {
        if (deleteConfirm === true) {
            axios
                .delete(
                    process.env.REACT_APP_PROXY + `/services/delete-service/` + _id)
                .then((res) => {
                    if (res.status === 200) {
                        NotificationManager.warning("Service successfully deleted", "", 1500)
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)
                    } else Promise.reject();
                })
                .catch((err) => NotificationManager.error("Something went wrong !", "Oops", 2000));
            setDeleteConfirm(false)
        } else {
            NotificationManager.error("make sure if you want to delete this service", "Are you sure ?", 3000)
            setDeleteConfirm(true)
        }
    }
    return (
        <tr>
            <td></td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{new Date(startDate).toDateString()}</td>
            <td>{new Date(endDate).toDateString()}</td>
            <td>{details}</td>
            <td>{cDate.getTime() > new Date(endDate).getTime() ?
                <div style={{ color: "tomato" }}>expired</div> :
                <div style={{ color: "lightgreen" }}>available</div>}
            </td>
            <td><img src={topicImage} alt="topic" width="150px" /></td>
            <td>
                {bidStatus.length === 0 ?
                    <span>
                        <button onClick={handleEdit} style={{ borderRadius: "5px", backgroundColor: "green", border: "none", outline: "none", padding: "7px 10px", color: "white" }}>Edit</button>
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
                                    <input type="text" placeholder="name..." value={name1} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div>
                                    <span>Price($): </span>
                                    <input type="number" placeholder="price..." value={price1} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div>
                                    <span>Available Date: </span>
                                    <span><input type="date" placeholder="from" value={startDate1} onChange={(e) => setStartDate(e.target.value)} /></span> ~
                                    <span><input type="date" placeholder="to" value={endDate1} onChange={(e) => setEndDate(e.target.value)} /></span>
                                </div>
                                <div>
                                    <span>Details: </span>
                                    <textarea placeholder="please explain about this service here..." value={details1} onChange={(e) => setDetails(e.target.value)} />
                                </div>
                                <div>
                                    <span>Topic Image: </span>
                                    {!topicImage1 ?
                                        <input type="file" name="topicImage" onChange={handleImage} /> :
                                        null
                                    }
                                    <img src={topicImage1 ? URL.createObjectURL(topicImage1) : null} alt="topic" width="150px" />
                                </div>
                                <button onClick={updateService} disabled={(name1 && price1 && startDate1 && endDate1 && details1 && topicImage1) ? false : true} >Update</button>
                                <button onClick={handleEdit} >Cancel</button>
                            </div>
                        </Modal>
                        <button onClick={deleteService} style={{ borderRadius: "5px", backgroundColor: "tomato", border: "none", outline: "none", padding: "7px 10px", color: "white" }}>Delete</button>
                    </span> :
                    <button style={{ backgroundColor: "#ffa300", border: "none", outline: "none", padding: "7px 10px", color: "white" }}
                        onClick={() => {
                            NotificationManager.warning("Bid already started. You can't EDIT/DELETE services", "Warning", 5000)
                        }}>Sealed</button>
                }
            </td>
        </tr>
    )
}