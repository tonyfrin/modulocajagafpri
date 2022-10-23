import React from 'react';


function useGafpriBudget() {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const {
    isFetching,
    isInit,
    isEmit,
    isPrint,
    
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

    const onEmit = () => dispatch({
        type: actionTypes.isEmit,
    });

    const onPrint = () => dispatch({
        type: actionTypes.isPrint,
    });

    


/**
 * Export Status and Actions
 *
 * 
 */

    const states = {
        isFetching,
        isInit,
        isEmit,
        isPrint,
    }

    const actions = {
        onFetching,
        onInit,
        onEmit,
        onPrint,
    }

    return {
        states,
        actions,
    };

}

const initialState = () => ({
    isFetching: false,
    isInit: true,
    isEmit: false,
    isPrint: false,
});

const actionTypes = {
    fetching: 'FETCHING',
    init: 'INIT',
    isEmit: 'EMIT',
    isPrint: 'PRINT',
};

const reducerObject = (state, payload) => ({
    [actionTypes.fetching]: {
        ...state,
        isFetching: true,
        isInit: false,
        isEmit: false,
        isPrint: false,
    },
    [actionTypes.init]: {
        ...state,
        isFetching: false,
        isInit: true,
        isEmit: false,
        isPrint: false,
    },
    [actionTypes.isEmit]: {
        ...state,
        isFetching: false,
        isInit: false,
        isEmit: true,
        isPrint: false,
    },
    [actionTypes.isPrint]: {
        ...state,
        isFetching: false,
        isInit: false,
        isEmit: false,
        isPrint: true,
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};

export { useGafpriBudget };