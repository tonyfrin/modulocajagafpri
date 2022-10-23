import React from "react";
import { Title1, Title2 } from "../abstracts/Title/Title";
import dayjs from "dayjs";
import { Button4 } from "../abstracts/Button/Button";
import { Table1 } from "../abstracts/Table";



const Print = ({ budgets, mainActions, source}) => {
    const budgetsPrint = budgets.data.budgets;
    budgetsPrint.sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : a.dateCreated > b.dateCreated ? -1 : 0));

    function header () {
        return(
            <>
                <tr>
                    <th>Presupuesto #</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Monto</th>
                    <th>Acciones</th>
                </tr>
            </>
        )
    }

    function Items({items}) {
        return (
        <>
            {items &&
            items.map((budget) => (
                <tr key={budget.id}>
                   
                        <td className='gs-col-3'>{budget.id}</td>
                        <td className='gs-col-2'>{dayjs(budget.dateCreated).format("DD - MM - YYYY")}</td>
                        <td className='gs-col-4'>{budget.userName}</td>
                        <td className='gs-col-2'>{budget.total.toFixed(2)}</td>
                        <td className='gs-col-1'>
                            <a href={`${source.url}/presupuesto-pdf/?budget_id=${budget.id}`} target="_blank" rel="noreferrer">
                                    <Button4
                                        Title='Ver'
                                        color='#07b2e7'
                                        GsKey={`button-${budget.id}`}
                                    />
                            </a>
                        </td>

                </tr>
            ))}
        </>
        );
    }

    return(
        <>
            <div className="main-header-sales-module">
                <Title1 title='Modulo de Presupuesto' />
                <Title2 title='Imprimir'/>
                <Table1 
                    Items={budgetsPrint}
                    Header={header}
                    ItemList={Items}
                    isButton={true}
                    TitleButton='Regresar'
                    color='#c12429'
                    FunctionButton={mainActions.onInit}
                />
           </div>
        </>
    )

}

export { Print };