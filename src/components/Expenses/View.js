import React from 'react';
import { Form4 } from '../abstracts/Form';
import { Title2 } from '../abstracts/Title/Title';
import dayjs from 'dayjs';
import { gsThousandsFormat } from '../abstracts/Helpers/helpers';
import { Button4, Button3 } from '../abstracts/Button/Button';

function View({expensesTransaction, accounting, mainActions}) {
    const id = expensesTransaction.id;
    const dateCreated = expensesTransaction.dateCreated;
    const userName = expensesTransaction.userName;
    const project = accounting.getProjectInfoById(expensesTransaction.projectId, 'name');
    const expenses = accounting.getExpensesInfoById(expensesTransaction.expensesId, 'name');
    const reason = expensesTransaction.reason;
    const documentId = expensesTransaction.documentId;
    const status = expensesTransaction.status;
    const total = expensesTransaction.total;
    const payment = expensesTransaction.paymentMethod;
    const paymentId = expensesTransaction.transactionId;
    let nameStatus = '';
    let colorStatus = '';
    if(status === 'gs-draft'){
        nameStatus = 'Borrador';
        colorStatus = '#afb3b9';
    } else if(status === 'gs-on-hold'){
        nameStatus = 'En Espera';
        colorStatus = '#f8dda7';
    } else if(status === 'gs-cancelled'){
        nameStatus = 'Cancelado / Devuelto';
        colorStatus = '#c12429';
    } else if(status === 'gs-completed'){
        nameStatus = 'Completado';
        colorStatus = '#439b57';
    }


  return (
    <>
        <Form4>
            <div className="gs-row gs-title-payment">
                <Title2 
                    title={`Egreso #${id}`}
                />
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Fecha:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{dayjs(dateCreated).format("DD - MM - YYYY")}</span>
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Proveedor:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{userName}</span>
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Proyecto:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{project}</span>
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Tipo de Egreso:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{expenses}</span>
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Motivo:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{reason}</span>
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'># Documento/Factura:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{documentId}</span>
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Estatus:</h4>
                </div>
                <div className="gs-col-6 gs-value-form4">
                        <Button4
                            Title={nameStatus}
                            color={colorStatus}
                        />
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Monto:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{`$ ${gsThousandsFormat(total)}`}</span>
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Metodo de Pago:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{payment}</span>
                </div>
            </div>
            <div className="gs-row gs-row-form4">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'># de Pago:</h4>
                </div>
                <div className="gs-col-6">
                    <span className='gs-value-form4'>{paymentId}</span>
                </div>
            </div>
            <div className="gs-row gs-row-button-form4">
                <Button3
                    Title='Regresar'
                    color='#c12429'
                    Function={mainActions.returnExpenses}
                />
            </div>
        </Form4> 
    </>
  )
}

export {View}; 
