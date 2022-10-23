import React from 'react';
import { Button1, ButtonExtend1 } from '../Button/Button';
import users from '../constants/Users';



const Menu1 = ({onLogOut}) => {
    const menu = users.roles.asesor.menu;

    const listItems = menu.map(( item ) =>
        item.exit ? 
          <li onClick={onLogOut} key={item.id} className='gs-li-menu-1'>
              <ButtonExtend1 imgSrc={item.imgSrc} title={item.title} />
          </li> 
        : 
          <li key={item.id} className='gs-li-menu-1'>
              <Button1 imgSrc={item.imgSrc} title={item.title} link={item.src}/>
          </li> 
    );
    return (
        <>
            <div className='gs-container gs-row-menu-1'>
                <div className='gs-col-10 gs-col-menu-1'>
                        <ul className='gs-row gs-ul-menu-1'>
                            {listItems}
                        </ul>
                </div>
            </div>
        </>
    )
}



export default Menu1;