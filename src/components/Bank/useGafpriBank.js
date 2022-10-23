import React from 'react';
import { gafpriFetch } from '../abstracts/Context/gafpriFetch';
import { validationInput, removeClass, addClass, validationSelect, customValidation } from '../abstracts/Helpers/Validations';


function useGafpriBank(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const {
    isFetching,
    isInit,
    isRecharge,
    isIncome,
    isExpenses,
    isTransfers,
    isBalances,

    error,

    total,
    nameSend,
    verification,
    bankCode,
    dateTransfer,
    method,

    validTotal,
    validNameSend,
    validVerification,
    validBankCode,
    validDateTransfer,
    validMethod,
    isButtonActive,
    
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

    const onRecharge = () => dispatch({
        type: actionTypes.isRecharge,
    });

    const onIncome = () => dispatch({
        type: actionTypes.isIncome,
    });
    
    const onExpenses = () => dispatch({
        type: actionTypes.isExpenses,
    });

    const onTransfers = () => dispatch({
        type: actionTypes.isTransfers,
    });

    const onBalances = () => dispatch({
        type: actionTypes.isBalances,
    });

    

/**
 * Set Actions
 *
 * 
 */

    const setTotal = (newData) => dispatch({
        type: actionTypes.total,
        payload: newData,
    });

    const setNameSend = (newData) => dispatch({
        type: actionTypes.nameSend,
        payload: newData,
    });

    const setVerification = (newData) => dispatch({
        type: actionTypes.verification,
        payload: newData,
    });

    const setBankCode = (newData) => dispatch({
        type: actionTypes.bankCode,
        payload: newData,
    });

    const setDateTransfer = (newData) => dispatch({
        type: actionTypes.dateTransfer,
        payload: newData,
    });

    const setMethod = (newData) => dispatch({
        type: actionTypes.method,
        payload: newData,
    });

    const setError = (newData) => dispatch({
        type: actionTypes.error,
        payload: newData,
    });

    const setValidTotal = (newData) => dispatch({
        type: actionTypes.validTotal,
        payload: newData,
    });

    const setValidNameSend = (newData) => dispatch({
        type: actionTypes.validNameSend,
        payload: newData,
    });

    const setValidVerification = (newData) => dispatch({
        type: actionTypes.validVerification,
        payload: newData,
    });

    const setValidValidBankCode = (newData) => dispatch({
        type: actionTypes.validBankCode,
        payload: newData,
    });

    const setValidDateTransfer = (newData) => dispatch({
        type: actionTypes.validDateTransfer,
        payload: newData,
    });

    const setValidMethod = (newData) => dispatch({
        type: actionTypes.validMethod,
        payload: newData,
    });

    const setIsButtonActive = (newData) => dispatch({
        type: actionTypes.isButtonActive,
        payload: newData,
    });

    

    

/**
 * Add Actions
 *
 * 
 */

    function addWttIn() {
        if(isButtonActive){
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/wtt-ins/add',
                initCredentials: {
                    total: total, 
                    nameSend: nameSend,
                    verification: verification,
                    bankCode: bankCode,
                    dateTransfer: dateTransfer,
                    method: method,
                },
                initToken: props.currentUser, 
                functionFetching: onFetching,
                functionSuccess: successAdd,
                functionError: changeError,
            });
        }
    } 

    function changeError(newData){
        setError(newData.data);
        onRecharge();
        setTimeout(() => {
            setError([]);
        }, 10000);
    }

    function successAdd(){
        exitRecharge();
    }

/**
 * Validation Actions
 *
 * 
 */    

    const validationTotal = (value) => {
        let valid = customValidation(value <= 0, 'total', 'gs-input-alert');
        setValidTotal(valid);
    }

    const validationDateTransfer = (value) => {
        let valid = validationSelect(value, 'dateTransfer', 'gs-input-alert');
        setValidDateTransfer(valid);
    }

    const validationMethod = (value) => {
        let valid = validationSelect(value, 'method', 'gs-input-alert');
        setValidMethod(valid);
    }

    const validationBankCode = (value) => {
        let valid = validationSelect(value, 'bankCode', 'gs-input-alert');
        setValidValidBankCode(valid);
    }

    const validationNameSend = (value) => {
        let valid = validationInput(value, /^[a-zA-Z0-9]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_.\s]+$/, 'nameSend', 'gs-input-alert', true);
        setValidNameSend(valid);
    }

    const validationVerification = (value) => {
        let valid = validationInput(value, /^[a-zA-Z0-9]+[a-zA-Z0-9áéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ]+$/, 'verification', 'gs-input-alert', true);
        setValidVerification(valid);
    }

    const validationButtonActive = () => {
        if(
            validTotal &&
            validNameSend &&
            validVerification &&
            validBankCode &&
            validDateTransfer &&
            validMethod
        ){
            removeClass('wttInAdd', 'gs-disabled');
            setIsButtonActive(true);
        } else{
            addClass('wttInAdd', 'gs-disabled');
            setIsButtonActive(false);
        }
    }

/**
 * Change Actions
 *
 * 
 */    

    function exitRecharge(){
        setTotal(0);
        setNameSend('');
        setVerification('');
        setBankCode('');
        setDateTransfer('');
        setMethod('');
        onInit();
    }

    function changeDateTransfer(value){
        setDateTransfer(value);
        validationDateTransfer(value);
    }

    function changeMethod(value){
        setMethod(value);
        validationMethod(value);
    }

    function changeBankCode(value){
        setBankCode(value);
        validationBankCode(value);
    }

    function changeNameSend(value){
        setNameSend(value);
        validationNameSend(value);
    }

    function changeVerification(value){
        setVerification(value);
        validationVerification(value);
    }

    function changeTotal(value){
        setTotal(value);
        validationTotal(value);
    }
    


/**
 * Export Status and Actions
 *
 * 
 */

    const states = {
        isFetching,
        isInit,
        isRecharge,
        isIncome,
        isExpenses,
        isTransfers,
        isBalances,
        error,
        total,
        nameSend,
        verification,
        bankCode,
        dateTransfer,
        method,
        validTotal,
        validNameSend,
        validVerification,
        validBankCode,
        validDateTransfer,
        validMethod,
        isButtonActive,
    }

    const actions = {
        onFetching,
        onInit,
        onRecharge,
        onIncome,
        onExpenses,
        onTransfers,
        onBalances,
        changeTotal,
        exitRecharge,
        changeNameSend,
        changeVerification,
        changeBankCode,
        changeDateTransfer,
        changeMethod,
        addWttIn,
        validationDateTransfer,
        validationMethod,
        validationBankCode,
        validationNameSend,
        validationVerification,
        validationTotal,
        validationButtonActive,
        setError,
    }

    return {
        states,
        actions,
    };

}

const initialState = () => ({
    isFetching: false,
    isInit: true,
    isRecharge: false,
    isIncome: false,
    isExpenses: false,
    isTransfers: false,
    isBalances: false,
    total: 0,
    nameSend: '',
    verification: '',
    bankCode: '',
    dateTransfer: '',
    method: '',
    error: [],
    validTotal: false,
    validNameSend: false,
    validVerification: false,
    validBankCode: false,
    validDateTransfer: false,
    validMethod: false,
    isButtonActive: false,
});

const actionTypes = {
    fetching: 'FETCHING',
    init: 'INIT',
    isRecharge: 'RECHARGE',
    isIncome: 'INCOME',
    isExpenses: 'EXPENSES',
    isTransfers: 'TRANSFERS',
    isBalances: 'BALANCES',
    total: 'TOTAL',
    nameSend: 'NAME_SEND',
    verification: 'VERIFICATION',
    bankCode: 'BANK_CODE',
    dateTransfer: 'DATE_TRANSFER',
    method: 'METHOD',
    error: 'ERROR',
    validTotal: 'VALID_TOTAL',
    validNameSend: 'VALID_NAME_SEND',
    validVerification: 'VALID_VERIFICATION',
    validBankCode: 'VALID_BANK_CODE',
    validDateTransfer: 'VALID_DATE_TRANSFER',
    validMethod: 'VALID_METHOD',
    isButtonActive: 'IS_BUTTON_ACTIVE',
};

const reducerObject = (state, payload) => ({
    [actionTypes.fetching]: {
        ...state,
        isFetching: true,
        isInit: false,
        isRecharge: false,
        isIncome: false,
        isExpenses: false,
        isTransfers: false,
        isBalances: false,
    },
    [actionTypes.init]: {
        ...state,
        isFetching: false,
        isInit: true,
        isRecharge: false,
        isIncome: false,
        isExpenses: false,
        isTransfers: false,
        isBalances: false,
    },
    [actionTypes.isRecharge]: {
        ...state,
        isFetching: false,
        isInit: false,
        isRecharge: true,
        isIncome: false,
        isExpenses: false,
        isTransfers: false,
        isBalances: false,
    },
    [actionTypes.isIncome]: {
        ...state,
        isFetching: false,
        isInit: false,
        isRecharge: false,
        isIncome: true,
        isExpenses: false,
        isTransfers: false,
        isBalances: false,
    },
    [actionTypes.isExpenses]: {
        ...state,
        isFetching: false,
        isInit: false,
        isRecharge: false,
        isIncome: false,
        isExpenses: true,
        isTransfers: false,
        isBalances: false,
    },
    [actionTypes.isTransfers]: {
        ...state,
        isFetching: false,
        isInit: false,
        isRecharge: false,
        isIncome: false,
        isExpenses: false,
        isTransfers: true,
        isBalances: false,
    },
    [actionTypes.isBalances]: {
        ...state,
        isFetching: false,
        isInit: false,
        isRecharge: false,
        isIncome: false,
        isExpenses: false,
        isTransfers: false,
        isBalances: true,
    },
    [actionTypes.total]: {
        ...state,
        total: payload,
    },
    [actionTypes.nameSend]: {
        ...state,
        nameSend: payload,
    },
    [actionTypes.verification]: {
        ...state,
        verification: payload,
    },
    [actionTypes.bankCode]: {
        ...state,
        bankCode: payload,
    },
    [actionTypes.dateTransfer]: {
        ...state,
        dateTransfer: payload,
    },
    [actionTypes.method]: {
        ...state,
        method: payload,
    },
    [actionTypes.error]: {
        ...state,
        error: payload,
    },
    [actionTypes.validTotal]: {
        ...state,
        validTotal: payload,
    },
    [actionTypes.validNameSend]: {
        ...state,
        validNameSend: payload,
    },
    [actionTypes.validVerification]: {
        ...state,
        validVerification: payload,
    },
    [actionTypes.validBankCode]: {
        ...state,
        validBankCode: payload,
    },
    [actionTypes.validDateTransfer]: {
        ...state,
        validDateTransfer: payload,
    },
    [actionTypes.validMethod]: {
        ...state,
        validMethod: payload,
    },
    [actionTypes.isButtonActive]: {
        ...state,
        isButtonActive: payload,
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};

export { useGafpriBank };