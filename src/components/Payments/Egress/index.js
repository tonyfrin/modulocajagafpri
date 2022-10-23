import React from 'react';
import { Title1, Title2 } from '../../abstracts/Title/Title';
import { Step1 } from '../../abstracts/Step/Step';
import { TableOrdersOnHold } from '../Receipts/Order/TableOrdersOnHold';
import { useGafpriEgress } from './useGafpriEgress';
import { UpdateSales } from '../../UpdateSales';
import { TableCredit } from '../Receipts/Credit/TableCredit';
import { Payment } from '../Receipts/Payment';
import Loading from '../../loading';



function Egress({mainStates, mainActions, users, products, orders, credits, currentUser, source, accounting}) {
    const {
        states,
        actions,
    } = useGafpriEgress({orders, credits, accounting, currentUser, source, mainActions});
  
    if(states.isOrder){
        return(
            <>
                <div className="main-header-sales-module">
                    <Title1 title='Modulo de Salidas' />
                    <Title2 title='Compras en espera'/>
                    <Step1 
                        step='1'
                        title='Paso'
                        titleReturn='Inicio'
                        functionReturn={mainActions.onInit}
                        titleNext='Siguiente'
                        functionNext={actions.onCredit}
                    />
                    <TableOrdersOnHold 
                        orders={mainStates.purchasesOnHold}
                        mainStates={states}
                        mainActions={actions}
                        source={source}
                        purchase={true}
                    />
                </div> 
            </>
        )
    } else if(states.isUpdateOrder){
        return(
            <>
                    <UpdateSales 
                        users = {users}
                        products = {products}
                        orders = {orders}
                        currentUser = {currentUser}
                        source = {source}
                        title = 'Modulo de Pago'
                        apiRoute = ''
                        buttonReturn = 'Volver'
                        functionReturn = {actions.onOrder}
                        userId = {states.userIdUpdateOrder}
                        orderId={states.updateOrderId}
                        purchase={true}
                    />
               
            </>
        )
    }else if(states.isCredit){
        return(
            <>
                <div className="main-header-sales-module">
                    <Title1 title='Modulo de Salidas' />
                    <Title2 title='Créditos por pagar'/>
                    <Step1 
                        step='2'
                        title='Paso'
                        titleReturn='Regresar'
                        functionReturn={actions.returnOrder}
                        titleNext='Siguiente'
                        functionNext={actions.onPayment}
                        gsIdButtonNext='next-pay-button'
                    />
                    <TableCredit 
                        credits={credits}
                        mainState={states}
                        mainActions={actions}
                        liabilitie={true}
                    />
                </div> 
            </>
        )
    }else if(states.isPayment){
        return(
            <>
                <div className="main-header-sales-module">
                    <Title1 title='Modulo de Salidas' />
                    <Title2 title='Página de Pago'/>
                    <Step1 
                        step='3'
                        title='Paso'
                        titleReturn='Regresar'
                        functionReturn={actions.onCredit}
                    />
                    <Payment 
                        mainActions={actions}
                        mainStates={states}
                        accounting={accounting}
                        users={users}
                        egress={true}
                    />
                </div> 
            </>
        ) 
    } else if(states.isFetching){
        return(
            <>
                <main className="gs-container gs-sales-container">
                    <Loading />
                </main>
            </>
        )
    }
}

export { Egress };