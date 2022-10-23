import React from "react";
import dayjs from "dayjs";
import { Button4 } from "../../../abstracts/Button/Button";
import { Table1 } from "../../../abstracts/Table";
import { Tienda } from "../../../abstracts/constants/Tienda";



const TableOrdersOnHold = ({ orders, mainStates, mainActions, source, purchase }) => {
    const ordersPrint = orders;
    const selectOrders = mainStates.selectOrders;
    const purchases = purchase || false;


    function header () {
        return(
            <>
                <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Usuario</th>
                    <th>Monto</th>
                    <th>Seleccionar</th>
                    <th>Acciones</th>
                </tr>
            </>
        )
    }

    function Items({items}) {
        return (
        <>
            {items &&
            items.map((order) => (
                <tr key={order.id}>
                        <td className='gs-col-3'>{order.id}</td>
                        <td className='gs-col-2'>{dayjs(order.dateCreated).format("DD - MM - YYYY")}</td>
                        <td className='gs-col-4'>{order.userName}</td>
                        <td className='gs-col-2'>{Tienda.currencySymbol} {parseFloat(order.total).toFixed(2)}</td>
                        <td className="gs-col-1"><input id={`order-id-${order.id}`} type='checkbox' value={order.id} defaultChecked={selectOrders.includes(order.id)} onChange={(event) => mainActions.selectOrder(event)}/></td>
                        <td className='gs-row'>
                            <span className="gs-buttons-accions">
                                <Button4
                                    Title='X'
                                    color='#c12429'
                                    GsKey={`button-${order.id}`}
                                    Function={() => mainActions.orderUpdateStatus( order.id, 'wc-cancelled', 'cancelled' )}
                                />
                            </span>
                            <span className="gs-buttons-accions">
                                <Button4
                                    Title='Editar'
                                    color='#439b57'
                                    GsKey={`button-${order.id}`}
                                    Function={() => mainActions.changeUserIdUpdateOrder(order.userId, order.id)}
                                />
                            </span>
                            {! purchases && 
                                <span className="gs-buttons-accions">
                                    <a href={`${source.url}/gafpri-admin/proforma-pdf?order_id=${order.id}`} target="_blank" rel="noreferrer">
                                        <Button4
                                            Title='Ver'
                                            color='#07b2e7'
                                            GsKey={`button-${order.id}`}
                                        />
                                    </a>
                                </span>
                            }
                        </td>

                </tr>
            ))}
        </>
        );
    }

    return(
        <>
            <Table1 
                Items={ordersPrint}
                Header={header}
                ItemList={Items}
            />
        </>
    )

}

export { TableOrdersOnHold };