import React from 'react';
import { useGafpriPayments } from './useGafpriPayments';
import { Init } from '../abstracts/Init/Init';
import IconReceipts from '../../assets/img/cxp-emitir.png';
import IconEgress from '../../assets/img/cxp-pagar.png';
import { Receipts } from './Receipts';
import { Egress } from './Egress';

function Payments({orders, users, products, credits, purchases, liabilities, currentUser, source, accounting}) {
    const {
        states,
        actions,
    } = useGafpriPayments({orders, purchases});

    const buttons = [
        [      
          {
            id: 'button-1',
            imgSrc: IconReceipts, 
            title: 'Entrada',
            src: actions.onReceipts,
            isFunction: true
          },
          {
            id: 'button-2',
            imgSrc: IconEgress, 
            title: 'Salida',
            src: actions.onEgress,
            isFunction: true
          },
        ]
      ]
  
  
    if(states.isInit){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Init 
                        buttons={buttons}
                    />
                </main>
            </>
        )
    } else if(states.isReceipts){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Receipts
                        mainStates={states}
                        mainActions={actions}
                        users={users}
                        products={products}
                        currentUser={currentUser}
                        source = {source}
                        orders = {orders}
                        credits = {credits}
                        accounting= {accounting}
                    />
                </main>
            </>
        )
    } else if(states.isEgress){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Egress
                        mainStates={states}
                        mainActions={actions}
                        users={users}
                        products={products}
                        currentUser={currentUser}
                        source = {source}
                        orders = {purchases}
                        credits = {liabilities}
                        accounting= {accounting}
                    />
                </main>
            </>
        )
    }
}

export { Payments };
