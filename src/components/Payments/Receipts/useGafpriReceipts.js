import React from "react";
import { gafpriFetch } from "../../abstracts/Context/gafpriFetch";
import { gsIsIncludes, gsThousandsFormat } from "../../abstracts/Helpers/helpers";
import { addClass, removeClass } from "../../abstracts/Helpers/Validations";
import { cash } from "../../abstracts/constants/cash";


function useGafpriReceipts(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState(props));
    const {
        isOrder,
        isFetching,
        isUpdateOrder,
        isCredit,
        isPayment,

        userIdUpdateOrder,
        updateOrderId,

        selectOrders,
        selectCredits,

        paymentInfo,
        totalOrder,
        paymentMethodInfo,
        usersPaymentInfo,

        selectPayments,
        totalSelectPayments,

        turnedMethodInfo,
        selectTurned,
        totalSelectTurned,

        error,
    } = state;

    /**
     * Actions Set
     *
     * 
     */
        const onOrder = () => dispatch({
            type: actionTypes.isOrder,
        });

        const onUpdateOrder = () => dispatch({
            type: actionTypes.isUpdateOrder,
        });

        const onCredit = () => dispatch({
            type: actionTypes.isCredit,
        });

        const onPayment = () => {
            if(selectOrders.length > 0 || selectCredits.length > 0){
                dispatch({
                    type: actionTypes.isPayment,
                });
            }
        }

        const onFetching = () => dispatch({
            type: actionTypes.isFetching,
        });
            

        const setSelectOrders = (newData) => dispatch({
            type: actionTypes.selectOrders,
            payload: newData,
        });

        const setUserIdUpdateOrder = (newData) => dispatch({
            type: actionTypes.userIdUpdateOrder,
            payload: newData,
        });

        const setUpdateOrderId = (newData) => dispatch({
            type: actionTypes.updateOrderId,
            payload: newData,
        });

        const setSelectCredits = (newData) => dispatch({
            type: actionTypes.selectCredits,
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

        const setError = (newData) => dispatch({
            type: actionTypes.error,
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

        

        



        

        


        

/**
 * Actions Oreders
 *
 * 
 */

        function selectOrder(e){
            const checked = e.target.checked;
            const value = e.target.value;

            const new_ids_orders = checked
            ? [...state.selectOrders, value]
            : [...state.selectOrders.filter((id) => id !== value)];

            setSelectOrders(new_ids_orders);
        }

        function changeUserIdUpdateOrder(userId, orderId){
            setUserIdUpdateOrder(userId);
            setUpdateOrderId(orderId);
            onUpdateOrder();
        }

        function setOrderUpdateStatusDB (orderId, status) {
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/orders/update-status', 
                initCredentials: {
                    status: `${status}`,
                    orderId: `${orderId}`,
                    notes: '',
                },
                initToken: props.currentUser,
              });
    
        }

        function orderUpdateStatus (orderId, statusWc, status) {
            props.orders.updateStatusOrder (orderId, status);
            setOrderUpdateStatusDB (orderId, statusWc);
        }

/**
 * Actions Credits
 *
 * 
 */

    function filterActiveCredits(userId){
        let newActiveCredits = [];
        props.credits.getActiveCreditsByUserId(userId).map((credit) => {
            if(! gsIsIncludes(selectCredits, credit.id, 'id')){
                newActiveCredits.push(credit);
            }
            return null;
        })
        return newActiveCredits;
    }

    function changeSelectCredits(userId){
        let newSelectCredits = selectCredits;
        let creditsItem = document.getElementById(userId);
        for(var i=0;i<creditsItem.children.length;i++){  
            if(creditsItem.children[i].children[3].firstChild.checked){
                let newCredit = {
                    id: creditsItem.children[i].children[0].innerHTML,
                    amount: creditsItem.children[i].children[3].firstChild.value,
                }
                newSelectCredits.push(newCredit);
            } else if(creditsItem.children[i].children[4].firstChild.checked){
                let newCredit = {
                    id: creditsItem.children[i].children[0].innerHTML,
                    amount: creditsItem.children[i].children[4].children[1].value,
                }
                newSelectCredits.push(newCredit);
            }
        }
        setSelectCredits(newSelectCredits);
    }

    function payButtonValidation(userId){
        let validation = false;
        let validationAbono = 1;
        let amount = 0;
        let creditsItem = document.getElementById(userId);

        for(var i=0;i<creditsItem.children.length;i++){  
            if(creditsItem.children[i].children[3].firstChild.checked){
                amount += parseFloat(creditsItem.children[i].children[3].firstChild.value);
            } else if(creditsItem.children[i].children[4].firstChild.checked){
                amount += parseFloat(creditsItem.children[i].children[4].children[1].value);
                if(parseFloat(creditsItem.children[i].children[4].children[1].value) > parseFloat(creditsItem.children[i].children[3].firstChild.value)){
                    validationAbono *= 0; 
                }
            }
        }

        if(amount > 0 && validationAbono === 1){
            validation = true;
            removeClass('pay-button', 'gs-disabled');
        } else{
            addClass('pay-button', 'gs-disabled');
        }

        return validation;
    }

    function nextButtonPayment(){
        if(selectOrders.length > 0 || selectCredits.length > 0){
            removeClass('next-pay-button', 'gs-disabled');
        } else{
            addClass('next-pay-button', 'gs-disabled');
        }
    }

    function returnOrder(){
        removeClass('next-pay-button', 'gs-disabled');
        onOrder();
    }

/**
 * Actions Payments
 *
 * 
 */
 
    function headerPaymentInfo(){
        let numbers = '';
        let total = 0;
        let usersId = [];

        selectOrders.map((order) => {
            const orderId = props.orders.getOrderInfo(order, 'id');
            const amount = props.orders.getOrderInfo(order, 'total');
            const userId = props.orders.getOrderInfo(order, 'userId');
            if(! usersId.includes(userId)){
                usersId.push(userId);
            }
            numbers = `${numbers} ${orderId}`;
            total += parseFloat(amount);
            return null;
        });
        selectCredits.map((credit) => {
            numbers = `${numbers} ${credit.id}`;
            total += parseFloat(credit.amount);
            const userId = props.credits.getCreditInfo(credit.id, 'userId');
            if(! usersId.includes(userId)){
                usersId.push(userId);
            }
            return null;
        });

        let newPaymentInfo = [
            {title: 'Tipo', value: 'Ingreso'},
            {title: 'Numeros', value: numbers},
            {title: 'Pago Total', value: `$ ${gsThousandsFormat(total)}`},
        ];
        setPaymentInfo(newPaymentInfo);
        setUsersPaymentInfo(usersId);
        setTotalOrder(total);
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
        onPayment();
    }

    function changeError(newData){
        setError(newData.data);
        onPayment();
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
        if(parseFloat(totalOrder.toFixed(2)) === (parseFloat(totalSelectPayments.toFixed(2)) - parseFloat(totalSelectTurned.toFixed(2)))){
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/receipts-payment/add',
                initCredentials: {
                    orders: selectOrders,
                    credits: selectCredits,
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

    function successPayment(){
        onOrder();
        setSelectOrders([]);
        setSelectCredits([]);
        setSelectPayments([]);
        setSelectTurned([]);
        setUsersPaymentInfo([]);
        setPaymentInfo([]);
        setTotalOrder(0);
        setTotalSelectPayments(0);
        setTotalSelectTurned(0);
        props.mainActions.onInit();
    }

    

    
    /**
     * Export Status and Actions
     *
     * 
     */
    
      const states = {   
        isOrder,
        isUpdateOrder,
        isCredit,
        isPayment,
        isFetching,
        selectOrders,
        userIdUpdateOrder,
        updateOrderId,
        selectCredits,
        paymentInfo,
        paymentMethodInfo,
        selectPayments,
        usersPaymentInfo,
        error,
        totalOrder,
        totalSelectPayments,
        selectTurned,
        totalSelectTurned,
        turnedMethodInfo,
      }
  
      const actions = {
        onOrder,
        onCredit,
        onPayment,
        selectOrder,
        changeUserIdUpdateOrder,
        orderUpdateStatus,
        setSelectCredits,
        changeSelectCredits,
        filterActiveCredits,
        payButtonValidation,
        nextButtonPayment,
        returnOrder,
        headerPaymentInfo,
        addSelectPayment, 
        removeItemSelectPayment,
        approvePaymentByWallet,
        addSelectTurned,
        removeItemSelectTurned,
        addPayment,
      }
  
      return {
          states,
          actions,
      };
  
  }
  
  const initialState = (props) => ({
    isOrder: true,
    isUpdateOrder: false,
    isCredit: false,
    isPayment: false,
    isFetching: false,
    selectOrders: [],
    userIdUpdateOrder: 0,
    updateOrderId: 0,
    selectCredits: [],
    paymentInfo: [],
    paymentMethodInfo: {
        efectivo: {name: 'Efectivo', items: cash},
        cheque: {name: 'Cheque', items:[{active: true}]},
        zelle: {name: 'Zelle', items: props.accounting.getBanksByType('zelle')},
        transferencia: {name: 'Transferencia', items: props.accounting.getBanksByType('transferencia')},
        puntoDeVenta: {name: 'Punto de venta', items: props.accounting.getBanksByType('puntoDeVenta')},
        pagoMovil: {name: 'Pago Movil', items: props.accounting.getBanksByType('pagoMovil')},
        credit: {name: 'Crédito', items: [{active: true}]},
        discount: {name: 'Descuento', items:[{active: true}]},
        manual: {name: 'Manual', items:[{active: true}]},
        commission: {name: 'Comisión', items:[{active: true}]},
    },
    turnedMethodInfo: {
        efectivo: {name: 'Efectivo', items: cash},
        zelle: {name: 'Zelle', items: props.accounting.getBanksByTurned('zelle')},
        transferencia: {name: 'Transferencia', items: props.accounting.getBanksByTurned('transferencia')},
        pagoMovil: {name: 'Pago Movil', items: props.accounting.getBanksByTurned('pagoMovil')},
        discount: {name: 'Sobrante', items:[{active: true}]},
        turnedLiabilities: {name: 'Vuelto por Pagar', items:[{active: true}]},
    },
    selectPayments: [],
    usersPaymentInfo: [],
    error: [],
    totalOrder: 0,
    totalSelectPayments: 0,
    selectTurned: [],
    totalSelectTurned: 0,
  });
  
  const actionTypes = {
    isOrder: 'ORDER',
    isUpdateOrder: 'UPDATE_ORDER',
    isCredit: 'CREDIT',
    isPayment: 'PAYMENT',
    isFetching: 'FETCHING',
    selectOrders: 'SELECT_ORDERS',
    userIdUpdateOrder: 'USER_ID_UPDATE_ORDER',
    updateOrderId: 'UPDATE_ORDER_ID',
    selectCredits: 'SELECT_CREDITS',
    paymentInfo: 'PAYMENT_INFO',
    selectPayments: 'SELECT_PAYMENTS',
    usersPaymentInfo: 'USERS_PAYMENT_INFO',
    error: 'ERORR',
    totalOrder: 'TOTAL_ORDER',
    totalSelectPayments: 'TOTAL_SELECT_PAYMENTS',
    selectTurned: 'SELECT_TURNED',
    totalSelectTurned: 'TOTAL_SELECT_TURNED',
  };
  
  const reducerObject = (state, payload) => ({
    [actionTypes.isOrder]: {
        ...state,
        isOrder: true,
        isUpdateOrder: false,
        isCredit: false,
        isPayment: false,
        isFetching: false,
    },
    [actionTypes.isUpdateOrder]: {
        ...state,
        isOrder: false,
        isUpdateOrder: true,
        isCredit: false,
        isPayment: false,
        isFetching: false,
    },
    [actionTypes.isCredit]: {
        ...state,
        isOrder: false,
        isUpdateOrder: false,
        isCredit: true,
        isPayment: false,
        isFetching: false,
    },
    [actionTypes.isPayment]: {
        ...state,
        isOrder: false,
        isUpdateOrder: false,
        isCredit: false,
        isPayment: true,
        isFetching: false,
    },
    [actionTypes.isFetching]: {
        ...state,
        isOrder: false,
        isUpdateOrder: false,
        isCredit: false,
        isPayment: false,
        isFetching: true,
    },
    [actionTypes.selectOrders]: {
        ...state,
        selectOrders: payload,
    },
    [actionTypes.userIdUpdateOrder]: {
        ...state,
        userIdUpdateOrder: payload,
    },
    [actionTypes.updateOrderId]: {
        ...state,
        updateOrderId: payload,
    },
    [actionTypes.selectCredits]: {
        ...state,
        selectCredits: payload,
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
    [actionTypes.error]: {
        ...state,
        error: payload,
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
  });
  
  const reducer = (state, action) => {
      return reducerObject(state, action.payload)[action.type] || state;
  };
  
  export { useGafpriReceipts };