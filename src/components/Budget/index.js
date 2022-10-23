import React from "react";
import { useGafpriBudget } from "./useGafpriBudget";
import { Init } from "../abstracts/Init/Init";
import { Sales } from "../Sales";
import { Print } from "./Print";
import IconAddBudget from "../../assets/img/add-budget.png";
import IconPrintBudget from "../../assets/img/printer.png";


const Budget = ({users, products, budgets, currentUser, source}) => {
    const {
        states,
        actions,
    } = useGafpriBudget();

    const buttons = [
        [      
          {
            id: 'button-1',
            imgSrc: IconAddBudget, 
            title: 'Emitir',
            src: actions.onEmit,
            isFunction: true
          },
          {
            id: 'button-2',
            imgSrc: IconPrintBudget, 
            title: 'Imprimir',
            src: actions.onPrint,
            isFunction: true
          }
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
    } else if(states.isEmit){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Sales users={users} products={products} currentUser={currentUser} source={source} apiRoute='gafpriadmin/v1/budget/add' title='Modulo de Presupuesto' buttonReturn={true} functionReturn={actions.onInit}/>
                </main>
            </>
        )
    } else if(states.isPrint){
        return(
            <>
                <main className="gs-container gs-main-presupuesto">
                    <Print budgets={budgets} mainActions={actions} source={source}/>
                </main>
            </>
        )
    }
}

export { Budget };