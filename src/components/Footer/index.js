import React from 'react';


function MainFooter({isLogin, onLogOut}){

    return(
        <footer className='gs-main-footer'>
            <div className='gs-row gs-row-footer'>
                <p className='gs-content-footer'>© Copyright 2021 Gafpri Corp - Todos los derechos reservados</p>
                {isLogin ? 
                <>
                    <span className='gs-separator-footer'> / </span>
                    <span onClick={onLogOut} className='gs-out-footer' >Salir</span>
                </>
                : ''}
            </div>
        </footer>
    )
}

export default MainFooter;