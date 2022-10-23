import React from 'react';
import { useGafpriExpenses } from './useGafpriExpenses';
import { Init } from '../abstracts/Init/Init';
import IconAdd from "../../assets/img/init_purchase.png";
import { Expenses } from '../abstracts/Transations/Expenses/Index';
import Loading from '../loading';
import { Print } from './Print';
import IconExpenses from "../../assets/img/printer.png";
import { View } from './View';
import { Return } from './Return';

function ExpensesModule({users, accounting, source, currentUser, expensesTransactions}) { 
    const {
        states,
        actions,
    } = useGafpriExpenses({accounting, source, currentUser, expensesTransactions});

    const buttons = [
        [  
          {
            id: 'button-1',
            imgSrc: IconAdd, 
            title: 'Emitir',
            src: actions.onAdd,
            isFunction: true
          },
          {
            id: 'button-2',
            imgSrc: IconExpenses, 
            title: 'Ver',
            src: actions.onExpenses,
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
    } else if(states.isAdd){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Expenses
                        close={actions.onInit} 
                        users={users} 
                        accounting={accounting}
                        route='gafpriadmin/v1/expenses/add'
                        mainActions={actions}
                        mainStates={states}
                        source={source}
                        currentUser={currentUser}
                        onInit={actions.onAdd}
                        expensesModule={true}
                        expensesTransactions={expensesTransactions}
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
    } else if(states.isExpenses){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Print expensesTransactions={expensesTransactions} mainActions={actions} />
                </main>
            </>
        )
    } else if(states.isExpensesView){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    {states.expensesTransaction && 
                        <View 
                            expensesTransaction={states.expensesTransaction}
                            accounting={accounting}
                            mainActions={actions}
                        />
                    }
                </main>
            </>
        )
    } else if(states.isExpensesReturn){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    {states.expensesTransaction && 
                        <Return 
                            expensesTransaction={states.expensesTransaction}
                            accounting={accounting}
                            mainActions={actions}
                            mainStates={states}
                            expensesTransactions={expensesTransactions}
                        />
                    }
                </main>
            </>
        )
    }
}

export {ExpensesModule};
