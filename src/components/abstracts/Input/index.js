import React from 'react';

const Input1 = (propos) => (
    <>
        <input type={propos.GsType} style={propos.gsStyle} className='gs-input-1' min={propos.min} onKeyUp={propos.GsFunction} placeholder={propos.GsPlaceholder} defaultValue={propos.defaultValue} id={propos.GsId} autoComplete={propos.autoComplete}/>
    </>
)

const Input2 = (propos) => (
    <>
        <input type={propos.GsType} style={propos.gsStyle} className='gs-input-2' min={propos.min} onChange={propos.GsFunction} placeholder={propos.GsPlaceholder} defaultValue={propos.defaultValue} id={propos.GsId} autoComplete={propos.autoComplete} max={propos.max}/>
    </>
)

const Input3 = (propos) => (
    <>
        <input type={propos.GsType} className='gs-input-2' min={propos.min} onKeyUp={propos.GsFunction} placeholder={propos.GsPlaceholder} defaultValue={propos.defaultValue} id={propos.GsId} autoComplete={propos.autoComplete} max={propos.max}/>
    </>
)

const Input4 = (propos) => (
    <>
        <input type={propos.GsType} style={propos.gsStyle} className='gs-input-1' min={propos.min} onChange={propos.GsFunction} placeholder={propos.GsPlaceholder} defaultValue={propos.defaultValue} id={propos.GsId} autoComplete={propos.autoComplete} max={propos.max}/>
    </>
)

export {Input1, Input2, Input3, Input4};