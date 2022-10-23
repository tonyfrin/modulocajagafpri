import React from "react";
import { FormDespachoHeader } from "../abstracts/Form";
import { Title1 } from "../abstracts/Title/Title";
import dayjs from "dayjs"
import { Table1 } from "../abstracts/Table";


const OrderDetails = ({ mainState, mainActions }) => {
    const order = mainState.orderSelect;
    const formattedDate = dayjs(order.dateCreated).format("DD - MM - YYYY");

   

    function Items({items}) {
        return (
        <>
            {items &&
            items.map((product) => (
                <tr key={product.id}>
                   
                        <td className='gs-col-2'>{product.sku}</td>
                        <td className='gs-col-8'>{product.productName}</td>
                        <td className='gs-col-2'>{product.quantity}</td>
                   
                </tr>
            ))}
        </>
        );
    }

    function header () {
        return(
            <>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                </tr>
            </>
        )
    }

    return(
        <>
        <div className="gs-container-modal-despacho">
            <Title1 title='Modulo Despacho' />
            <FormDespachoHeader 
                orderId = {order.id}
                FunctionReturn = {mainActions.onInit}
                userName = {order.userName}
                orderDate = {formattedDate}
            />
            {order.status === 'preparar' ?
                <Table1 
                    Items={order.products}
                    Header={header}
                    ItemList={Items}
                    Placeholder='Agergar Nota'
                    TitleButton='Prepara'
                    color='#07b2e7'
                    defaultValue={order.notes}
                    FunctionButton={() => mainActions.orderUpdateStatus('wc-processing', 'processing')}
                    FuctionInput={(event) => mainActions.setNotes(event.target.value)}
                    isInput={true}
                    isButton={true}
                /> :
                <Table1 
                    Items={order.products}
                    Header={header}
                    ItemList={Items}
                    Placeholder='Agergar Nota'
                    TitleButton='Despachar'
                    color='#439b57'
                    defaultValue={order.notes}
                    FunctionButton={() => mainActions.orderUpdateStatus('wc-completed', 'completed')}
                    FuctionInput={(event) => mainActions.setNotes(event.target.value)}
                    isInput={true}
                    isButton={true}
                />
            }
        </div>
        </>
    )

}

export { OrderDetails };