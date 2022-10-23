import React from 'react';
import { Link } from "react-router-dom";


const Button1 = (propos) => (
            <Link to={propos.link} className='gs-button-1'>
                <img src={propos.imgSrc} className='gs-img-button-1' alt={propos.title}/>
                <span className='gs-name-button-1'>{propos.title}</span>
            </Link>
)

const ButtonExtend1 = (propos) => (
    <>
        <div className='gs-button-1'>
            <img src={propos.imgSrc} className='gs-img-button-1' alt={propos.title}/>
            <span className='gs-name-button-1'>{propos.title}</span>
        </div>
    </>
)

const Button2 = (propos) => (
    <>
        <Link to={propos.link} key={propos.GsKey} className='gs-button-8'>
            <img src={propos.imgSrc} className='gs-img-button-8' alt={propos.title}/>
            <span className='gs-name-button-8'>{propos.title}</span>
        </Link>
    </>
)

const ButtonExtend2 = (propos) => (
    <>
        <div key={propos.GsKey} onClick={propos.GsFunction} className='gs-button-8'>
            <img src={propos.imgSrc} className='gs-img-button-8' alt={propos.title}/>
            <span className='gs-name-button-8'>{propos.title}</span>
        </div>
    </>
)

const Button3 = (props) => (
    <>
        <span style={{backgroundColor: `${props.color}`}} id={props.GsId} onClick={props.Function} className='gs-button-3'>{props.Title}</span>
    </>
)

const Button4 = (props) => (
    <>
        <span style={{backgroundColor: `${props.color}`}} key={props.GsKey} onClick={props.Function} className={`gs-button-4 ${props.gsClass}`} id={props.gsId}>{props.Title}</span>
    </>
)



export { Button1, Button2, ButtonExtend1, ButtonExtend2, Button3, Button4};


