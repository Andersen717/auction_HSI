import React from 'react'

import '../main.css'



export const Underline = () => {
    return (
        <center>
            <div className="underline"></div>
        </center>
    )
}

export const Button1 = (props) => {
    const { btnContent, handleEvent, btn1Class, disabled } = props;
    return (
        <button className={btn1Class} onClick={handleEvent} disabled={disabled} >
            {btnContent}
        </button>
    )
}

export const Button1Left = (props) => {
    const { btnContent, handleEvent } = props;
    return (
        <button className="theme_button_1_left" onClick={handleEvent}>{btnContent}</button>
    )
}

export const Button2 = (props) => {
    const { btnContent, handleEvent, disabled, btn2Class } = props;
    return (
        <button className={btn2Class} onClick={handleEvent} disabled={disabled}>{btnContent}</button>
    )
}

export const Button2Left = (props) => {
    const { btnContent, handleEvent } = props;
    return (
        <button className="theme_button_2_left" onClick={handleEvent}>{btnContent}</button>
    )
}