import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Underline } from '../../components/theme'
import { Button1 } from '../../components/theme'

import BackgroundParticles from '../../components/particles'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default function Faq() {

    const [goback, setGoback] = useState("")

    useEffect(() => {
        setGoback("GO BACK")
    }, [])
    return (
        <div className="App">
            <BackgroundParticles />
            <Header />
            <div style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold", textAlign: "center", marginTop: "50px" }}>
                FAQ
            </div>
            <Underline />
            <div className="faq_contents">
                <div className="faq_topic">
                    What does LOREM mean?
                </div>
                <div className="faq_main">
                    Lorem Ipsum was originally taken from a Latin text by the Roman philosopher Cicero. ... The word 'lorem', for example, isn't a real Latin word, it's a shortened version of the word 'dolorem', meaning pain. This makes the current dummy text impossible to translate into English
                </div>
                <div className="faq_topic">
                    What does LOREM mean?
                </div>
                <div className="faq_main">
                    Lorem Ipsum was originally taken from a Latin text by the Roman philosopher Cicero. ... The word 'lorem', for example, isn't a real Latin word, it's a shortened version of the word 'dolorem', meaning pain. This makes the current dummy text impossible to translate into English
                </div>
                <div className="faq_topic">
                    What does LOREM mean?
                </div>
                <div className="faq_main">
                    Lorem Ipsum was originally taken from a Latin text by the Roman philosopher Cicero. ... The word 'lorem', for example, isn't a real Latin word, it's a shortened version of the word 'dolorem', meaning pain. This makes the current dummy text impossible to translate into English
                </div>
                <Link to="/calendar" >
                    <Button1 btnContent={goback} btn1Class="theme_button_1" />
                </Link>
            </div>
            <Footer />
        </div>
    )
}