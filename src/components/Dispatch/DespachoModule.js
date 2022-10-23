import React from "react";
import { Title1 } from "../abstracts/Title/Title";
import { TableDespacho } from "../abstracts/Table/TableDespacho";


const DespachoModule = ({ mainState, mainActions }) => {

                
    return(
        <>
            <div className="gs-container-despacho">
                <Title1 
                    title='Modulo Despacho'
                />
                <div className="gs-row gs-row-despacho">
                    <TableDespacho 
                        Title='Pedidos por Preparar'
                        TitleButton='Preparar'
                        GsColor='#07b2e7'
                        Items={mainState.orderPreparar}
                        FunctionSelect={mainActions.changeOrderSelect}
                    />
                    <TableDespacho 
                        Title='Pedidos por Despachar'
                        TitleButton='Despachar'
                        GsColor='#439b57'
                        Items={mainState.orderDespachar}
                        FunctionSelect={mainActions.changeOrderSelect}
                    />
                </div>
            </div>
        </>
    )

}

export { DespachoModule };