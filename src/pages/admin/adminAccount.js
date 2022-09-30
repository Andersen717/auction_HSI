import React from 'react'
import { Grid } from '@material-ui/core'

import BackgroundParticles from '../../components/particles'
import AdminLeftBarProps from '../../components/adminLeftProps'

export default function AdminAccount() {
    return (
        <div className="bid_record admin_padding">
            <BackgroundParticles />
            <Grid container>
                <Grid item md={4} lg={3} >
                    <AdminLeftBarProps />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                    <div style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold" }}>Admin Account</div>
                    <div id="Bid-record" style={{ marginTop: "50px" }}>
                        <table className="table table-striped css-serial"  >
                            <thead>
                                <tr>
                                    <th style={{ borderRadius: "15px 0 0 15px" }}>ID</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Created Date</th>
                                    <th style={{ borderRadius: "0 15px 15px 0" }}>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>rumman@auction.com</td>
                                    <td><div type="password">rumman0313)#!#</div></td>
                                    <td>2021-12-22-17-23-34</td>
                                    <td>Manager</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}