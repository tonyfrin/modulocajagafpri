import React from 'react';
import { Button2, ButtonExtend2 } from '../Button/Button';


const MainMenu = (propos) => {

    const items = propos.Buttons.map(( item, index ) => (
        <>
            <ul key={`ul-${item[index].id}`} className="gs-row gs-row-home">
                {
                    item.map((button, i) =>{ 

                        return (
                        <li key={`li-${button.id}`} className="gs-li-home">
                            { button.isFunction ? 
                            <ButtonExtend2 GsKey={`button-${button.title}`} GsFunction={button.src} imgSrc={button.imgSrc} title={button.title}/>
                            :
                            <Button2 GsKey={`button2-${button.title}`} link={button.src} imgSrc={button.imgSrc} title={button.title}/>
                            }
                        </li>
                    )})
                }
            </ul>
        </>
    ));


    return(
        <>
            {items}
        </>
    )
}

export {MainMenu};