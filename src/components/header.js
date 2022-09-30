import React from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import '../main.css'
import Logo from '../assets/img/logo_light.png'

export default function Header() {
    return (
        <div className="topBar">
            <Grid container>
                <Grid item xs={6} sm={5} md={4} lg={4}>
                    <Link to="/" >
                        <img src={Logo} alt="the logo" style={{ width: "200px", height: "100px", marginTop: "50px" }} />
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}