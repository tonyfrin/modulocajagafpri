import React from 'react';
import Menu1 from '../abstracts/Menu/Menu';
import { LogoContainer1, LogoContainer2 } from '../abstracts/Logo/Logo';

    const MainHeader = ({MainLogo, onLogOut}) => (
            <>
                <header className='gs-main-header'>
                    <LogoContainer1 imgSrc={MainLogo} />
                    <Menu1 onLogOut={onLogOut}/>
                </header>
            </>
    )

    const LoginHeader = ({whiteLogo}) => (
            <>
                <header className='gs-login-header'>
                    <LogoContainer1 imgSrc={whiteLogo} />
                </header>
            </>
    )
    
    const AdminHeader = ({MainLogo}) => (
            <>
                <header className='gs-admin-header'>
                    <LogoContainer2 imgSrc={MainLogo} />
                </header>
            </>
    )   


export { MainHeader, LoginHeader, AdminHeader };