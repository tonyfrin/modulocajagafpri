import React from 'react';
import { gafpriFetch } from '../abstracts/Context/gafpriFetch';

function useGafpriDispatch(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const {
    isFetching,
    isInit,
    isOrderSelect,

    orderPreparar,
    orderDespachar,
    orderSelect,
    notes,
  } = state;


  React.useEffect(() => {
    changeOrderPreparar();
    changeOrderDespachar();
}, [props.orders]); // eslint-disable-line react-hooks/exhaustive-deps
  

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

    const onOrderSelect = () => dispatch({
        type: actionTypes.isOrderSelect,
    });

    const setOrderPreparar = (newData) => dispatch({
        type: actionTypes.orderPreparar,
        payload: newData,
    });

    const setOrderDespachar = (newData) => dispatch({
        type: actionTypes.orderDespachar,
        payload: newData,
    });

    const setOrderSelect = (newData) => dispatch({
        type: actionTypes.orderSelect,
        payload: newData,
    });

    const setNotes = (newData) => dispatch({
        type: actionTypes.notes,
        payload: newData,
    });

    function changeOrderPreparar () {
        const filterOrder = [];
        props.orders.data.orders.map(( order ) => {
            if(order.status.search("preparar") > -1){
                filterOrder.push(order);
            }
            return null;
        });
        filterOrder.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
        setOrderPreparar(filterOrder);
    }

    function changeOrderDespachar () {
        const filterOrder = [];
        props.orders.data.orders.map(( order ) => {
            if(order.status.search("processing") > -1){
                filterOrder.push(order);
            }
            return null;
        });
        filterOrder.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
        setOrderDespachar(filterOrder);
    }

    function changeOrderSelect(orderId){
        
        
        var dataOrder = props.orders.data.orders.filter(function(data){
            if(data.id === orderId){
                return true;
            }else{
                return false;
            }
        });
        if(dataOrder.length > 0){
            setOrderSelect(dataOrder[0]);
            onOrderSelect();
        }
    }

    function setOrderUpdateStatusDB (status) {
        gafpriFetch({
            initMethod: 'POST', 
            initApi: props.source.api, 
            initRoute: 'gafpriadmin/v1/orders/update-status', 
            initCredentials: {
                status: `${status}`,
                orderId: `${orderSelect.id}`,
                notes: `${notes}`
            },
            initToken: props.currentUser, 
            functionFetching: onFetching,
            functionSuccess: returnInit,
            functionError: returnInit,
          });

    } 

    function setOrdersUpdateStatus (status){
        let date = props.orders.data.date;
        let count = props.orders.data.count;
        let newOrders = [];
        props.orders.data.orders.map((item) => {
            if(item.id === orderSelect.id){
                newOrders.push({
                    id: item.id,
                    dateCreated: item.dateCreated,
                    dateModified: item.dateModified,
                    notes: notes,
                    products: item.products,
                    status: status,
                    userName: item.userName
                });
            } else{
                newOrders.push(item);
            }
            const newDataOrders = {
                data:{
                    date: date,
                    count: count,
                    orders: newOrders, 
                }
            }
            props.mainActions.getOrdersData(newDataOrders);
            return null;
        })
    }

    function orderUpdateStatus (statusWc, status) {
        setOrdersUpdateStatus (status);
        setOrderUpdateStatusDB (statusWc);
    }

    function returnInit () {
        setOrderSelect([]);
        onInit();
    }

    


/**
 * Export Status and Actions
 *
 * 
 */

    const states = {
        isFetching,
        isInit,
        isOrderSelect,
        orderPreparar,
        orderDespachar,
        orderSelect,
        notes,
    }

    const actions = {
        onFetching,
        onInit,
        onOrderSelect,
        changeOrderPreparar,
        changeOrderDespachar,
        changeOrderSelect,
        orderUpdateStatus,
        setNotes,
    }

    return {
        states,
        actions,
    };

}

const initialState = () => ({
    isFetching: false,
    isInit: true,
    isOrderSelect: false,
    orderPreparar: [],
    orderDespachar: [],
    orderSelect: [],
    notes: '',
});

const actionTypes = {
    fetching: 'FETCHING',
    init: 'INIT',
    isOrderSelect: 'IS_ORDER_SELECT',
    orderPreparar: 'ORDER_PREPARAR',
    orderDespachar: 'ORDER_DESPACHAR',
    orderSelect: 'ORDER_SELECT',
    notes: 'NOTES',
};

const reducerObject = (state, payload) => ({
    [actionTypes.fetching]: {
        ...state,
        isFetching: true,
        isInit: false,
        isOrderSelect: false,
    },
    [actionTypes.init]: {
        ...state,
        isFetching: false,
        isInit: true,
        isOrderSelect: false,
    },
    [actionTypes.isOrderSelect]: {
        ...state,
        isFetching: false,
        isInit: false,
        isOrderSelect: true,
    },
    [actionTypes.orderPreparar]: {
        ...state,
        orderPreparar: payload,
    },
    [actionTypes.orderDespachar]: {
        ...state,
        orderDespachar: payload,
    },
    [actionTypes.orderSelect]: {
        ...state,
        orderSelect: payload,
    },
    [actionTypes.notes]: {
        ...state,
        notes: payload,
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};

export { useGafpriDispatch };