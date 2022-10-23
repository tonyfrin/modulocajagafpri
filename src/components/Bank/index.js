import React from "react";
import { useGafpriBank } from "./useGafpriBank";
import { Init } from "../abstracts/Init/Init";
import { Recharge } from "./Recharge";
import IconRecharge from "../../assets/img/icon-aprobar-2.png";
import Loading from "../loading";
import { Income } from "../abstracts/Transations/Income/Index";
import { Expenses } from "../abstracts/Transations/Expenses/Index";
import { Transfers } from "../abstracts/Transations/Transfers";
import Balances from "./Balances";
import IconBalance from "../../assets/img/balance.png";
import IconTransfers from "../../assets/img/bank-transfer.png";
import IconIncome from "../../assets/img/icon-cargo.png";
import IconExpenses from "../../assets/img/icon-descargo.png";











const Bank = ({accounting, source, currentUser, users, cr, bankTransactions}) => {
    const {
        states,
        actions,
    } = useGafpriBank({source, currentUser});

    const buttons = [
        [  
          {
            id: 'button-5',
            imgSrc: IconBalance, 
            title: 'Balances',
            src: actions.onBalances,
            isFunction: true
          },    
          {
            id: 'button-1',
            imgSrc: IconRecharge, 
            title: 'Recarga',
            src: actions.onRecharge,
            isFunction: true
          },
          {
            id: 'button-2',
            imgSrc: IconIncome, 
            title: 'Ingreso',
            src: actions.onIncome,
            isFunction: true
          },
          {
            id: 'button-3',
            imgSrc: IconExpenses, 
            title: 'Egreso',
            src: actions.onExpenses,
            isFunction: true
          },
          {
            id: 'button-4',
            imgSrc: IconTransfers, 
            title: 'Traspaso',
            src: actions.onTransfers,
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
    } else if(states.isRecharge){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Recharge 
                        accounting={accounting}
                        mainActions={actions}
                        mainStates={states}
                    />
                </main>
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
    }else if(states.isIncome){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Income
                        close={actions.onInit} 
                        users={users} 
                        accounting={accounting}
                        route='gafpriadmin/v1/bank/income'
                        mainActions={actions}
                        mainStates={states}
                        source={source}
                        currentUser={currentUser}
                        onInit={actions.onIncome}
                    />
                </main>
            </>
        )
    }else if(states.isExpenses){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Expenses
                        close={actions.onInit} 
                        users={users} 
                        accounting={accounting}
                        route='gafpriadmin/v1/bank/expenses'
                        mainActions={actions}
                        mainStates={states}
                        source={source}
                        currentUser={currentUser}
                        onInit={actions.onExpenses}
                    />
                </main>
            </>
        )
    }else if(states.isTransfers){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Transfers
                        close={actions.onInit} 
                        users={users} 
                        accounting={accounting}
                        route='gafpriadmin/v1/bank/transfers'
                        mainActions={actions}
                        mainStates={states}
                        source={source}
                        currentUser={currentUser}
                        onInit={actions.onTransfers}
                        cr={cr}
                    />
                </main>
            </>
        )
    } else if(states.isBalances){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Balances 
                        accounting={accounting}
                        bankTransactions={bankTransactions}
                    />
                </main>
            </>
        )
    } 
}

export { Bank };