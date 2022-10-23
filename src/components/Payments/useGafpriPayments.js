import React from "react";

function useGafpriPayments(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState());
    const {
        isInit,
        isReceipts,
        isEgress,
        ordersOnHold,
        purchasesOnHold,
    } = state;


    /**
     * Effects
     *
     * 
     */

        React.useEffect(() => {
            changeOrderOnHold();
            changePurchasesOnHold();
        }, [props.orders]); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Actions Set
     *
     * 
     */
        const onInit = () => dispatch({
            type: actionTypes.isInit,
        });

        const onReceipts = () => dispatch({
            type: actionTypes.isReceipts,
        });

        const onEgress = () => dispatch({
            type: actionTypes.isEgress,
        });

        const setOrdersOnHold = (newData) => dispatch({
            type: actionTypes.ordersOnHold,
            payload: newData,
        });

        const setPurchasesOnHold = (newData) => dispatch({
            type: actionTypes.purchasesOnHold,
            payload: newData,
        });

    /**
     * Actions Orders
     *
     * 
     */


        function changeOrderOnHold () {
            const orderFilter = [];
            props.orders.orders.data.orders.map(( order ) => {
                if(order.status.search('on-hold') > -1){
                    orderFilter.push(order);
                }
                return null;
            });
            orderFilter.sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : a.dateCreated > b.dateCreated ? -1 : 0));
            setOrdersOnHold(orderFilter);
        }

    /**
     * Actions Purchases
     *
     * 
     */


     function changePurchasesOnHold () {
        const purchasesFilter = [];
        props.purchases.purchases.data.purchases.map(( purchase ) => {
            if(purchase.status.search('gs-on-hold') > -1){
                purchasesFilter.push(purchase);
            }
            return null;
        });
        purchasesFilter.sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : a.dateCreated > b.dateCreated ? -1 : 0));
        setPurchasesOnHold(purchasesFilter);
    }

    
    
    
    /**
     * Export Status and Actions
     *
     * 
     */
    
      const states = {   
        isInit,
        isReceipts,
        isEgress,
        ordersOnHold,
        purchasesOnHold,
      }
  
      const actions = {
        onInit,
        onReceipts,
        onEgress,
      }
  
      return {
          states,
          actions,
      };
  
  }
  
  const initialState = () => ({
    isInit: true,
    isReceipts: false,
    isEgress: false,
    ordersOnHold: [],
    purchasesOnHold: [],
  });
  
  const actionTypes = {
    isInit: 'INIT',
    isReceipts: 'RECEIPTS',
    isEgress: 'EGRESS',
    ordersOnHold: 'ORDERS_ON_HOLD',
    purchasesOnHold: 'PURCHASES_ON_HOLD',
  };
  
  const reducerObject = (state, payload) => ({
    [actionTypes.isInit]: {
        ...state,
        isInit: true,
        isReceipts: false,
        isEgress: false,
    },
    [actionTypes.isReceipts]: {
        ...state,
        isInit: false,
        isReceipts: true,
        isEgress: false,
    },
    [actionTypes.isEgress]: {
        ...state,
        isInit: false,
        isReceipts: false,
        isEgress: true,
    },
    [actionTypes.ordersOnHold]: {
        ...state,
        ordersOnHold: payload,
    },
    [actionTypes.purchasesOnHold]: {
        ...state,
        purchasesOnHold: payload,
    },
  });
  
  const reducer = (state, action) => {
      return reducerObject(state, action.payload)[action.type] || state;
  };
  
  export { useGafpriPayments };