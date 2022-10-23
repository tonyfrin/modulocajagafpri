import React from "react";
import { Title1, Title2 } from "../abstracts/Title/Title";
import dayjs from "dayjs";
import { Button4 } from "../abstracts/Button/Button";
import { Table1 } from "../abstracts/Table";
import { gsThousandsFormat } from "../abstracts/Helpers/helpers";



const Print = ({ expensesTransactions, mainActions, isPurchases, purchases}) => {
    let transactions;
    const onPurchases = isPurchases || false;
    if(onPurchases){
        transactions = purchases.purchases.data.purchases;
    } else{
        transactions = expensesTransactions.expensesTransactions.data.expensesTransactions;
    }
    transactions.sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : a.dateCreated > b.dateCreated ? -1 : 0));

    function header () {
        return(
            <>
                <tr>
                    <th>Egreso</th>
                    <th>Fecha</th>
                    <th>Estatus</th>
                    <th>Proveedor</th>
                    {! onPurchases && <th>Motivo</th>}
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
            items.map((item) => {
                const itemReturn = {
                    ...item,
                    reason: `Devolución de Egreso #${item.id}`,
                    project: item.projectId,
                };
                const status = item.status;
                let nameStatus = '';
                let colorStatus = '';
                if(status === 'gs-draft'){
                    nameStatus = 'Borrador';
                    colorStatus = '#afb3b9';
                } else if(status === 'gs-on-hold'){
                    nameStatus = 'En Espera';
                    colorStatus = '#f8dda7';
                } else if(status === 'gs-cancelled'){
                    nameStatus = 'Cancelado';
                    colorStatus = '#c12429';
                } else if(status === 'gs-completed'){
                    nameStatus = 'Completado';
                    colorStatus = '#439b57';
                }
                
                return (
                <tr key={item.id}>
                   
                        <td className={isPurchases ? 'gs-col-2' : 'gs-col-1'}>{item.id}</td>
                        <td className='gs-col-2'>{dayjs(item.dateCreated).format("DD - MM - YYYY")}</td>
                        <td className={isPurchases ? 'gs-col-2' : 'gs-col-1'}>
                                <Button4
                                    Title={nameStatus}
                                    color={colorStatus}
                                /> 
                        </td>
                        <td className='gs-col-2'>{item.userName}</td>
                        {! onPurchases && <td className='gs-col-2'>{item.reason}</td>}
                        <td className='gs-col-2'>{`$ ${gsThousandsFormat(item.total)}`}</td>
                        <td className='gs-col-2 gs-row'>
                            <span className="gs-buttons-accions">
                                <Button4
                                    Title='Ver'
                                    color='#07b2e7'
                                    GsKey={`button-${item.id}`}
                                    Function={() => mainActions.goToExpensesView(item)}
                                />
                            </span>
                            {item.status !== 'gs-cancelled' && item.status !== 'gs-on-hold' && item.status !== 'gs-draft' && 
                                <span className="gs-buttons-accions">
                                    <Button4
                                        Title='Devolución'
                                        color='#c12429'
                                        GsKey={`button-2-${item.id}`}
                                        Function={() => mainActions.goToExpensesReturn(itemReturn)}
                                    />
                                </span>
                            }
                            {(item.status === 'gs-on-hold' || item.status === 'gs-draft') &&
                                <span className="gs-buttons-accions">
                                    <Button4
                                        Title='Cancelar'
                                        color='#c12429'
                                        GsKey={`button-2-${item.id}`}
                                        Function={() => mainActions.cancelled(itemReturn)}
                                    />
                                </span>
                            }
                        </td>

                </tr>
            )})}
        </>
        );
    }

    return(
        <>
            <div className="main-header-sales-module">
                <Title1 title={isPurchases ? 'Modulo de Compra' : 'Modulo de Egresos'} />
                <Title2 title={isPurchases ? 'Ver Compras' : 'Ver Egresos'} />
                <Table1 
                    Items={transactions}
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