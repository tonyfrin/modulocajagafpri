import React from 'react';
import { Title1, Title2 } from '../abstracts/Title/Title';
import { Step1 } from '../abstracts/Step/Step';
import { Payment } from '../Payments/Receipts/Payment';
import { gsIsIncludes } from '../abstracts/Helpers/helpers';

function Return({accounting, users, mainActions, mainStates, expensesTransactions, expensesTransaction}) {
  
  React.useEffect(() => {
    if(expensesTransactions.getExpensesTransactionCreditInfo(expensesTransaction.id).success){
      // console.log(gsIsIncludes(mainStates.selectPayments, 'creditId', expensesTransactions.getExpensesTransactionCreditInfo(expensesTransaction.id).pm.creditId));
      if(! gsIsIncludes(mainStates.selectPayments, 'creditId', expensesTransactions.getExpensesTransactionCreditInfo(expensesTransaction.id).pm.creditId)){
        mainActions.addSelectPayment(expensesTransactions.getExpensesTransactionCreditInfo(expensesTransaction.id).pm);
      }
    }
  }, [mainStates.selectPayments]); // eslint-disable-line react-hooks/exhaustive-deps


  



  return (
    <>
        <div className="main-header-sales-module">
            <Title1 title='Modulo de Entradas' />
            <Title2 title='Página de Devolución'/>
            <Step1 
                step='2'
                title='Paso'
                titleReturn='Regresar'
                functionReturn={mainActions.returnOnExpenses}
            />
            <Payment 
                mainActions={mainActions}
                mainStates={mainStates}
                accounting={accounting}
                users={users}
            />
        </div> 
    </>
  )
}

export {Return}
