import React from 'react'
import Loading from '../assets/img/loadingSmall.gif'

export default function WinnersTableRow(props) {

    return (
        <tr>
            <td></td>
            <td>{props.obj.serviceName}</td>
            <td>{props.obj.price}</td>
            <td>{props.obj.address || <img src={Loading} alt="this bidder missed..." width={30} ></img>}</td>
            <td>
                {props.obj.userBalance !== 0 ?
                    props.obj.userBalance + " " + props.obj.currency :
                    <img src={Loading} alt="this bidder missed..." width={30} ></img>}
            </td>
            <td>{props.obj.amount + " " + props.obj.currency}</td>
            <td>{props.obj.date}</td>
            <td>{props.obj.contactInfor}</td>
            <td style={{ color: "yellow" }}>process</td>
        </tr>
    )
}