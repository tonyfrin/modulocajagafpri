import React from 'react';

const Title1 = (propos) => {
    
    return (
        <>
            <h1 className='gs-title-1'>{propos.title}</h1>
        </>
)}

const Title2 = (propos) => {
    
    return (
    <>
        <h2 className='gs-title-2'>{propos.title}</h2>
    </>
)}

const SubTitle1 = (propos) => (
    <>
        <h3 className='gs-sub-title-1'>
            <span className='gs-firts-title-1'>{propos.firtsTitle}</span>
            <span className='gs-second-title-1'>{propos.secondTitle}</span>
        </h3>
    </>
)

export { Title1, Title2, SubTitle1 };