import React from 'react';
import { cash } from '../abstracts/constants/cash';
import { gsThousandsFormat } from '../abstracts/Helpers/helpers';
import { gafpriFetch } from "../abstracts/Context/gafpriFetch";

function useGafpriExpenses(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState(props));
  const {
    isFetching,
    isInit,
    isAdd,
    isExpenses,
    isExpensesView,
    isExpensesReturn,

    expensesTransaction,
    error,

    paymentInfo,
    totalOrder,
    paymentMethodInfo,
    usersPaymentInfo,

    selectPayments,
    totalSelectPayments,

    turnedMethodInfo,
    selectTurned,
    totalSelectTurned,

    selectCredits,
    
  } = state;

/**
 * Path Actions
 *
 * 
 */
    const onFetching = () => dispatch({
        type: actionTypes.fetching,
    });

    const onInit = () => dispatch({
        type: actionTypes.init,
    });

    const onAdd = () => dispatch({
        type: actionTypes.isAdd,
    });
    
    const onExpenses = () => dispatch({
        type: actionTypes.isExpenses,
    });

    const onExpensesView = () => dispatch({
        type: actionTypes.isExpensesView,
    });

    const onExpensesReturn = () => dispatch({
        type: actionTypes.isExpensesReturn,
    });

    

/**
 * Set Actions
 *
 * 
 */

    const setError = (newData) => dispatch({
        type: actionTypes.error,
        payload: newData,
    });

    const setExpensesTransaction = (newData) => dispatch({
        type: actionTypes.expensesTransaction,
        payload: newData,
    });

    const setPaymentInfo = (newData) => dispatch({
        type: actionTypes.paymentInfo,
        payload: newData,
    });

    const setSelectPayments = (newData) => dispatch({
        type: actionTypes.selectPayments,
        payload: newData,
    });

    const setUsersPaymentInfo = (newData) => dispatch({
        type: actionTypes.usersPaymentInfo,
        payload: newData,
    });

    const setTotalOrder = (newData) => dispatch({
        type: actionTypes.totalOrder,
        payload: newData,
    });

    const setTotalSelectPayments = (newData) => dispatch({
        type: actionTypes.totalSelectPayments,
        payload: newData,
    });

    const setSelectTurned = (newData) => dispatch({
        type: actionTypes.selectTurned,
        payload: newData,
    });

    const setTotalSelectTurned = (newData) => dispatch({
        type: actionTypes.totalSelectTurned,
        payload: newData,
    });

    const setSelectCredits = (newData) => dispatch({
        type: actionTypes.selectCredits,
        payload: newData,
    });

    function goToExpensesView(expenses){
        setExpensesTransaction(expenses);
        onExpensesView();
    }

    function returnExpenses(){
        setExpensesTransaction(undefined);
        onExpenses();
    }

    function goToExpensesReturn(expenses){
        setExpensesTransaction(expenses);
        onExpensesReturn();
    }

    function cancelled(expenses){
        gafpriFetch({
            initMethod: 'POST', 
            initApi: props.source.api, 
            initRoute: 'gafpriadmin/v1/expenses/cancelled',
            initCredentials: {
                expenses: expenses,
            },
            initToken: props.currentUser, 
            functionFetching: onFetching,
            functionSuccess: successCancelled,
            functionError: changeError,
        });
    }

    function successCancelled(newData){
        if(newData.expensesTransactions.success){
            props.expensesTransactions.getExpensesTransactionsData(newData.expensesTransactions);
        }
        onExpenses();
    }


/**
 * Actions Payments
 *
 * 
 */ 
 
function headerPaymentInfo(){
    let newPaymentInfo = [
        {title: 'Tipo', value: 'Devolución de Egreso'},
        {title: 'Numeros', value: expensesTransaction.id},
        {title: 'Pago Total', value: `$ ${gsThousandsFormat(expensesTransaction.total)}`},
    ];
    setPaymentInfo(newPaymentInfo);
    setUsersPaymentInfo([expensesTransaction.userId]);
    setTotalOrder(expensesTransaction.total);
}

function addSelectPayment(newPayment){
    let total = 0;
    let newSelectPayments = selectPayments;
    newSelectPayments.push(newPayment);

    setSelectPayments(newSelectPayments);
    newSelectPayments.map((payment) => {
        total += parseFloat(payment.total);
        return null;
    })
    setTotalSelectPayments(total);
}

function removeItemSelectPayment(index){
    let total = 0;
    const newSelectPayments = selectPayments.filter(function(item, arr) {
        return arr !== index
    });
    setSelectPayments(newSelectPayments);
    newSelectPayments.map((payment) => {
        total += payment.total;
        return null;
    })
    setTotalSelectPayments(total);
}

function approvePaymentByWallet(newPayment){
    gafpriFetch({
        initMethod: 'POST', 
        initApi: props.source.api, 
        initRoute: 'gafpriadmin/v1/wtt-ins/approve',
        initCredentials: newPayment,
        initToken: props.currentUser, 
        functionFetching: onFetching,
        functionSuccess: addSelectPaymentByWallet,
        functionError: changeError,
    });
}

function addSelectPaymentByWallet(newPayment){
    addSelectPayment(newPayment.data);
    onExpensesReturn();
}

function changeError(newData){
    setSelectPayments([]);
    console.log(newData);
    setError(newData.data);
    onExpensesReturn();
    setTimeout(() => {
        setError([]);
    }, 10000);
}

/**
 * Actions Turned
 *
 * 
 */
 
 

 function addSelectTurned(newPayment){
    let total = 0;
    let newSelectTurned = selectTurned;
    newSelectTurned.push(newPayment);

    setSelectTurned(newSelectTurned);
    newSelectTurned.map((payment) => {
        total += payment.total;
        return null;
    })
    setTotalSelectTurned(total);
}

function removeItemSelectTurned(index){
    let total = 0;
    const newSelectTurned = selectTurned.filter(function(item, arr) {
        return arr !== index
    });
    setSelectTurned(newSelectTurned);
    newSelectTurned.map((payment) => {
        total += payment.total;
        return null;
    })
    setTotalSelectTurned(total);
}

function addPayment(){
    if(parseFloat(totalOrder) === (parseFloat(totalSelectPayments) - parseFloat(totalSelectTurned))){
        gafpriFetch({
            initMethod: 'POST', 
            initApi: props.source.api, 
            initRoute: 'gafpriadmin/v1/expenses/return',
            initCredentials: {
                expenses: expensesTransaction,
                payments: selectPayments,
                returned: selectTurned,
            },
            initToken: props.currentUser, 
            functionFetching: onFetching,
            functionSuccess: successPayment,
            functionError: changeError,
        });
    }
}

function successPayment(newdata){
    props.expensesTransactions.getExpensesTransactionsData(newdata.expensesTransactions);
    setExpensesTransaction(undefined);
    setSelectPayments([]);
    setSelectTurned([]);
    setUsersPaymentInfo([]);
    setPaymentInfo([]);
    setTotalOrder(0);
    setTotalSelectPayments(0);
    setTotalSelectTurned(0);
    onExpenses();
}

function returnOnExpenses(){
    setSelectPayments([]);
    setSelectTurned([]);
    onExpenses();
}
    


/**
 * Export Status and Actions
 *
 * 
 */

    const states = {
        isFetching,
        isInit,
        isAdd,
        isExpenses,
        isExpensesView,
        isExpensesReturn,
        expensesTransaction,

        error,

        paymentInfo,
        totalOrder,
        paymentMethodInfo,
        usersPaymentInfo,

        selectPayments,
        totalSelectPayments,

        turnedMethodInfo,
        selectTurned,
        totalSelectTurned,

        selectCredits,
        
    }

    const actions = {
        onFetching,
        onInit,
        onAdd,
        onExpenses,
        onExpensesView,
        goToExpensesView,
        goToExpensesReturn,
        returnExpenses,
        setError,
        headerPaymentInfo,
        addSelectPayment, 
        returnOnExpenses,
        removeItemSelectPayment,
        approvePaymentByWallet,
        addSelectTurned,
        removeItemSelectTurned,
        addPayment,
        setSelectCredits,
        cancelled,
    }

    return {
        states,
        actions,
    };

}

const initialState = (props) => ({
    isFetching: false,
    isInit: true,
    isAdd: false,
    isExpenses: false,
    isExpensesView: false,
    isExpensesReturn: false,
    error: [],
    expensesTransaction: undefined,
    paymentInfo: [],
    paymentMethodInfo: {
        efectivo: {name: 'Efectivo', items: cash},
        zelle: {name: 'Zelle', items: props.accounting.getBanksByType('zelle')},
        transferencia: {name: 'Transferencia', items: props.accounting.getBanksByType('transferencia')},
        puntoDeVenta: {name: 'Punto de venta', items: props.accounting.getBanksByType('puntoDeVenta')},
        pagoMovil: {name: 'Pago Movil', items: props.accounting.getBanksByType('pagoMovil')},
        manual: {name: 'Manual', items:[{active: true}]},
    },
    turnedMethodInfo: {
        efectivo: {name: 'Efectivo', items: cash},
        zelle: {name: 'Zelle', items: props.accounting.getBanksByTurned('zelle')},
        transferencia: {name: 'Transferencia', items: props.accounting.getBanksByTurned('transferencia')},
        pagoMovil: {name: 'Pago Movil', items: props.accounting.getBanksByTurned('pagoMovil')},
    },
    selectPayments: [],
    usersPaymentInfo: [],
    totalOrder: 0,
    totalSelectPayments: 0,
    selectTurned: [],
    totalSelectTurned: 0,
    selectCredits:[1],
});

const actionTypes = {
    fetching: 'FETCHING',
    init: 'INIT',
    isAdd: 'ADD',
    isExpenses: 'EXPENSES',
    isExpensesView: 'EXPENSES_VIEW',
    isExpensesReturn: 'EXPENSES_RETURN',
    error: 'ERROR',
    expensesTransaction: 'EXPENSES_TRANSACTION',
    paymentInfo: 'PAYMENT_INFO',
    selectPayments: 'SELECT_PAYMENTS',
    usersPaymentInfo: 'USERS_PAYMENT_INFO',
    totalOrder: 'TOTAL_ORDER',
    totalSelectPayments: 'TOTAL_SELECT_PAYMENTS',
    selectTurned: 'SELECT_TURNED',
    totalSelectTurned: 'TOTAL_SELECT_TURNED',
    selectCredits: 'SELECT_CREDITS',
};

const reducerObject = (state, payload) => ({
    [actionTypes.fetching]: {
        ...state,
        isFetching: true,
        isInit: false,
        isAdd: false,
        isExpenses: false,
        isExpensesView: false,
        isExpensesReturn: false,
    },
    [actionTypes.init]: {
        ...state,
        isFetching: false,
        isInit: true,
        isAdd: false,
        isExpenses: false,
        isExpensesView: false,
        isExpensesReturn: false,
    },
    [actionTypes.isAdd]: {
        ...state,
        isFetching: false,
        isInit: false,
        isAdd: true,
        isExpenses: false,
        isExpensesView: false,
        isExpensesReturn: false,
    },
    [actionTypes.isExpenses]: {
        ...state,
        isFetching: false,
        isInit: false,
        isAdd: false,
        isExpenses: true,
        isExpensesView: false,
        isExpensesReturn: false,
    },
    [actionTypes.isExpensesView]: {
        ...state,
        isFetching: false,
        isInit: false,
        isAdd: false,
        isExpenses: false,
        isExpensesView: true,
        isExpensesReturn: false,
    },
    [actionTypes.isExpensesReturn]: {
        ...state,
        isFetching: false,
        isInit: false,
        isAdd: false,
        isExpenses: false,
        isExpensesView: false,
        isExpensesReturn: true,
    },
    [actionTypes.error]: {
        ...state,
        error: payload,
    },
    [actionTypes.expensesTransaction]: {
        ...state,
        expensesTransaction: payload,
    },
    [actionTypes.paymentInfo]: {
        ...state,
        paymentInfo: payload,
    },
    [actionTypes.selectPayments]: {
        ...state,
        selectPayments: payload,
    },
    [actionTypes.usersPaymentInfo]: {
        ...state,
        usersPaymentInfo: payload,
    },
    [actionTypes.totalOrder]: {
        ...state,
        totalOrder: payload,
    },
    [actionTypes.totalSelectPayments]: {
        ...state,
        totalSelectPayments: payload,
    },
    [actionTypes.selectTurned]: {
        ...state,
        selectTurned: payload,
    },   
    [actionTypes.totalSelectTurned]: {
        ...state,
        totalSelectTurned: payload,
    },
    [actionTypes.selectCredits]: {
        ...state,
        selectCredits: payload,
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};

export { useGafpriExpenses };