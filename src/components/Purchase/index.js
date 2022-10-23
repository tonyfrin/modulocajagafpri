import React from "react";
import { Sales } from "../Sales";
import { useGafpriPurchases } from "./useGafpriPurchases";
import IconAdd from "../../assets/img/init_purchase.png";
import IconExpenses from "../../assets/img/printer.png";
import { Init } from "../abstracts/Init/Init";
import Loading from "../loading";
import { Print } from "../Expenses/Print";
import { View } from "./View";
import { Return } from "./Return";



const Purchase = ({users, products, currentUser, source, purchases, accounting}) => {
    const {
        states,
        actions,
    } = useGafpriPurchases({accounting, source, currentUser, purchases});


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
                    <Sales 
                        users={users} 
                        products={products} 
                        currentUser={currentUser} 
                        source={source} 
                        apiRoute='gafpriadmin/v1/purchases/add' 
                        title='Modulo de Compra'
                        functionReturn={actions.onInit}
                        buttonReturn={true}
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
                    <Print purchases={purchases} mainActions={actions} isPurchases={true}/>
                </main>
            </>
        )
    } else if(states.isExpensesView){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    {states.expensesTransaction && 
                        <View 
                            purchases={states.expensesTransaction}
                            users={users}
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
                            purchases={states.expensesTransaction}
                            users={users}
                            mainActions={actions}
                            isReturn={true}
                            mainStates={states}
                        />
                    }
                </main>
            </>
        )
    } else if(states.isExpensesPayment){
        
    }
    
    
}

export { Purchase };