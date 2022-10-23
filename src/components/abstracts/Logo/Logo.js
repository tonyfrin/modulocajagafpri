import React from 'react';
import { Link } from "react-router-dom";

const LogoContainer1 = ({imgSrc}) => (
        <>
                <section className='gs-row gs-row-logo-1'>
                        <div className='gs-col-12 gs-logo-container-1'>
                                <Link to='/'>
                                        <img className='gs-logo-1' src={imgSrc} alt='Logo Gafpri'/>
                                </Link>
                        </div>
                </section>
        </>
)

const LogoContainer2 = ({imgSrc}) => (
        <>
                <section className='gs-row gs-row-logo-2'>
                        <div className='gs-col-12 gs-col-logo-2'>
                        <Link to='/' className="gs-logo-container-2">
                                <img className='gs-logo-2' src={imgSrc} alt='Gafpri Admin'/><p className='gs-name-logo-2'>Admin </p>
                        </Link>
                        </div>
                </section>
        </>
)

export {LogoContainer1, LogoContainer2};