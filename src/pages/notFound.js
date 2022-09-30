import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/header'
import BackgroundParticles from '../components/particles';

export default function NotFound() {
    return (
        <div className="App" style={{ color: "#fff" }}>
            <BackgroundParticles />
            <Header />
            <div style={{ marginTop: "30vh" }}>
                <h1>404 - Oops, Not Found!</h1>
                <Link to="/" style={{ textDecoration: "none", color: "#fff", padding: "10px", backgroundColor: "#e40a58", borderRadius: "5px", cursor: "pointer" }}> Go Home</Link>
            </div>
        </div>
    )
}