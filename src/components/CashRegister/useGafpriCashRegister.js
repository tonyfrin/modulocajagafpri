import React from "react";
import { gafpriFetch } from "../abstracts/Context/gafpriFetch";
import { Tienda } from "../abstracts/constants/Tienda";

function useGafpriCashRegister(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState());
    const {
        isInit,
        isFetching,
        expenses,
        cashFinal,
        checkFinal,
        incomes, 
        cashInit,
        checkInit,
        debe, 
        haber,
        verification, 
        currency,
        error,
        egressUser,
        userSearch,
        isEgressInit,
        isEgressSelectUser,
        isEgress,


        name,
        lastName,
        nif,
        nifType,
        company,
        address,
        address2,
        city,
        stateCountry,
        country,
        postCode,
        email,
        phone,

    } = state;

    

    /**
     * Effects
     *
     * 
     */

        React.useEffect(() => {
            calculateTransactions('expense', setExpenses);
            calculateCashFinal();
            calculateTransactions('income', setIncomes);
            calculateCheckFinal();
            calculateCashInit();
            calculateCheckInit();
        }, [props.cr.crTransaction.data.crTransaction, props.cr.crCash.data.crCash, props.cr.crCheck.data.crCheck, props.cr.cr.data.cr.initialCash, props.cr.cr.data.cr.initialCheck]); // eslint-disable-line react-hooks/exhaustive-deps

        React.useEffect(() => {
            conciliation();
        }, [expenses, cashFinal, checkFinal, incomes, cashInit, checkInit]); // eslint-disable-line react-hooks/exhaustive-deps

/**
 * Actions Set
 *
 * 
 */
        const setExpenses = (newData) => dispatch({
            type: actionTypes.expenses,
            payload: newData,
        });

        const setCashFinal = (newData) => dispatch({
            type: actionTypes.cashFinal,
            payload: newData,
        });

        const setCheckFinal = (newData) => dispatch({
            type: actionTypes.checkFinal,
            payload: newData,
        });

        const setIncomes = (newData) => dispatch({
            type: actionTypes.incomes,
            payload: newData,
        });

        const setCashInit = (newData) => dispatch({
            type: actionTypes.cashInit,
            payload: newData,
        });

        const setCheckInit = (newData) => dispatch({
            type: actionTypes.checkInit,
            payload: newData,
        });

        const setVerification = (newData) => dispatch({
            type: actionTypes.verification,
            payload: newData,
        });

        const setDebe = (newData) => dispatch({
            type: actionTypes.debe,
            payload: newData,
        });

        const setHaber = (newData) => dispatch({
            type: actionTypes.haber,
            payload: newData,
        });

        const setCurrency = (newData) => dispatch({
            type: actionTypes.currency,
            payload: newData,
        });

        const onInit = () => dispatch({
            type: actionTypes.init,
        });

        const onFetching = () => dispatch({
            type: actionTypes.fetching,
        });

        const setError = (newData) => dispatch({
            type: actionTypes.error,
            payload: newData,
        });

        const setEgressUser = (newData) => dispatch({
            type: actionTypes.egressUser,
            payload: newData,
        });

        const onEgressInit = () => dispatch({
            type: actionTypes.isEgressInit,
        });

        const onEgressSelectUser = () => dispatch({
            type: actionTypes.isEgressSelectUser,
        });

        const onEgress = () => dispatch({
            type: actionTypes.isEgress,
        });

        const setUserSearch = (newData) => dispatch({
            type: actionTypes.userSearch,
            payload: newData,
        });

        
        

/**
 * Actions Set
 *
 * 
 */

        function calculateTransactions(type, set){
            let total = 0;
            props.cr.crTransaction.data.crTransaction && props.cr.crTransaction.data.crTransaction.map((item) => {
                if(item.type === type && item.status === 'gs_processing'){
                    total += parseFloat(item.amount);
                    
                }
                return null;
            });
            set(total);
        }

        function calculateCashFinal(){
            const newCurrency = [];
            let total = 0;
            props.cr.crCash.data.crCash && Object.entries(props.cr.crCash.data.crCash).map((item) => {
                total += parseFloat(item[1].balance); 
                const currency = {
                    label: item[1].currency === 'usd' ? 'Dólares Americanos' : item[1].currency === 'bsd' ? 'Bolívares' : '',
                    value: item[1].currency
                }
                newCurrency.push(currency);
                return null;
            });
            setCashFinal(total);
            setCurrency(newCurrency)
        }

        function calculateCheckFinal(){
            let total = 0;
            props.cr.crCheck.data.crCheck && props.cr.crCheck.data.crCheck.map((item) => {
                total += parseFloat(item.amount);
                return null;
            });
            setCheckFinal(total);
        }

        function calculateCashInit(){
            let total = 0;
            props.cr.cr.data.cr[0].initialCash && Object.entries(props.cr.cr.data.cr[0].initialCash).map((item) => {
                total += parseFloat(item[1].balance);
                return null;
            });
            setCashInit(total);
        }

        function calculateCheckInit(){
            let total = 0;
            props.cr.cr.data.cr[0].initialCheck && props.cr.cr.data.cr[0].initialCheck.map((item) => {
                total += parseFloat(item.amount);
                return null;
            });
            setCheckInit(total);
        }

        function conciliation(){
            const debe = expenses + cashFinal + checkFinal;
            const haber = incomes + cashInit + checkInit;

            const result = debe - haber;

            setDebe(debe);
            setHaber(haber);
            setVerification(result);
        }



/**
* Set Actions Form Add User
*
* 
*/
       
           const setName = (newData) => dispatch({
               type: actionTypes.name,
               payload: newData,
           });
       
           const setLastName = (newData) => dispatch({
               type: actionTypes.lastName,
               payload: newData,
           });
       
           const setCity = (newData) => dispatch({
               type: actionTypes.city,
               payload: newData,
           });
       
           const setStateCountry = (newData) => dispatch({
               type: actionTypes.state,
               payload: newData,
           });
       
           const setNifType = (newData) => dispatch({
               type: actionTypes.nifType,
               payload: newData,
           });
       
           const setNif = (newData) => dispatch({
               type: actionTypes.nif,
               payload: newData,
           });
       
           const setCompany = (newData) => dispatch({
               type: actionTypes.company,
               payload: newData,
           });
       
           const setAddress = (newData) => dispatch({
               type: actionTypes.address,
               payload: newData,
           });
       
           const setAddress2 = (newData) => dispatch({
               type: actionTypes.address2,
               payload: newData,
           });
       
           const setCountry = (newData) => dispatch({
               type: actionTypes.country,
               payload: newData,
           });
       
           const setPostCode = (newData) => dispatch({
               type: actionTypes.postCode,
               payload: newData,
           });
       
           const setEmail = (newData) => dispatch({
               type: actionTypes.email,
               payload: newData,
           });
       
           const setPhone = (newData) => dispatch({
               type: actionTypes.phone,
               payload: newData,
           });


/**
 * Actions Add
 *
 * 
 */

        function addTransfer(transfer){
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/cr/add-transfer', 
                initCredentials: transfer,
                initToken: props.currentUser, 
                functionFetching: onFetching,
                functionSuccess: successTransfer,
                functionError: changeError,
              });
        }

        function successTransfer(newData){
            props.cr.getCrTransactionData(newData.crTransaction);
            props.cr.getCrCashData(newData.crCash);
            onInit();
        }

        function successConciliate(newData){
            props.cr.getCrTransactionData(newData.crTransaction);
            props.cr.getCrCashData(newData.crCash);
            props.cr.getCrData(newData.cr);
            onInit();
        }


        function changeError(newData){
            setError(newData.data);
            onInit();
            setTimeout(() => {
                setError([]);
            }, 10000);
        }

        function addEgress(egress){
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/cr/add-egress', 
                initCredentials: egress,
                initToken: props.currentUser, 
                functionFetching: onFetching,
                functionSuccess: successTransfer,
                functionError: changeError,
              });
        }

        function addIncome(income){
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/cr/add-income', 
                initCredentials: income,
                initToken: props.currentUser, 
                functionFetching: onFetching,
                functionSuccess: successTransfer,
                functionError: changeError,
              });
        }

        function addDeposit(income){
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/cr/add-deposit', 
                initCredentials: income,
                initToken: props.currentUser, 
                functionFetching: onFetching,
                functionSuccess: successTransfer,
                functionError: changeError,
              });
        }

        function conciliate(crId){
            gafpriFetch({
                initMethod: 'POST', 
                initApi: props.source.api, 
                initRoute: 'gafpriadmin/v1/cr/conciliate', 
                initCredentials: crId,
                initToken: props.currentUser, 
                functionFetching: onFetching,
                functionSuccess: successConciliate,
                functionError: changeError,
              });
        }



/**
 * Actions Egress
 *
 * 
 */
        function changeUserNif (event) {
            if (event.key === 'Enter') {
                var nif = event.target.value;
                var dataUser = props.users.users.data.users.filter(function(data){
                    if(data.nif === nif){
                        return true;
                    }else{
                        return false;
                    }
                });
                if(dataUser.length > 0){
                    setEgressUser(dataUser[0]);
                    onEgress();
                } else{
                    setUserSearch(props.users.users.data.users);
                    onEgressSelectUser();
                }
            }
        }

        function changeUserName (event) {
            if (event.key === 'Enter') {
                const UserFilter = [];
                props.users.users.data.users.map(( user ) => {
                    if(user.name.toLowerCase().search(event.target.value.toLowerCase()) > -1){
                        UserFilter.push(user);
                    }
                    return null;
                }
                );
                UserFilter.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
                
                setUserSearch(UserFilter);
                onEgressSelectUser();
            }
        }

        function changeUserEmail(event) {
            if (event.key === 'Enter') {
                
                var email = event.target.value;
                var dataUser = props.users.users.data.users.filter(function(data){
                    if(data.email === email){
                        return true;
                    }else{
                        return false;
                    }
                });
                if(dataUser.length > 0){
                    setEgressUser(dataUser[0]);
                    onEgress();
                } else{
                    setUserSearch(props.users.users.data.users);
                    onEgressSelectUser();
                }
            }
        }

        function userSelect(user){
            setEgressUser(user)
            onEgress();
        }
        
                


    
      const states = {   
        isInit,
        isFetching,
        expenses,
        cashFinal,
        checkFinal,
        incomes,
        cashInit,
        checkInit,
        verification,
        debe,
        haber,
        currency,
        error,
        egressUser,
        
        isEgressInit,
        isEgressSelectUser,
        isEgress,
        
        userSearch,
        name,
        lastName,
        nif,
        nifType,
        company,
        address,
        address2,
        city,
        stateCountry,
        country,
        postCode,
        email,
        phone,
      }
  
      const actions = {
        onInit,
        onFetching,
        addTransfer,
        addEgress,
        addIncome,
        addDeposit,
        conciliate,

        changeUserNif,
        changeUserName,
        changeUserEmail,
        userSelect,

        onEgressInit,
        setEgressUser,

        setName,
        setLastName,
        setCity,
        setStateCountry,
        setNifType,
        setNif,
        setCompany,
        setAddress,
        setAddress2,
        setCountry,
        setPostCode,
        setEmail,
        setPhone,

      }
  
      return {
          states,
          actions,
      };
  
  }
  
  const initialState = () => ({
    isInit: true,
    isFetching: false,
    expenses: 0,
    cashFinal: 0,
    checkFinal: 0,
    incomes: 0,
    cashInit: 0,
    checkInit: 0,
    verification: 0,
    debe: 0,
    haber: 0, 
    currency: [],
    error: [],
    egressUser: [],
    isEgressInit: true,
    isEgressSelectUser: false,
    isEgress: false,
    userSearch: [],
    name: '',
    lastName: '',
    nif: '',
    nifType: '',
    company: '',
    address: '',
    address2: '',
    city: Tienda.city,
    stateCountry: {value: Tienda.state[0], label: Tienda.state[1]},
    country: {value: Tienda.country[0], label: Tienda.country[1]},
    postCode: '',
    email: '',
    phone: '',
  });
  
  const actionTypes = {
    expenses: 'EXPENSES',
    cashFinal: 'CASH_FINAL',
    checkFinal: 'CHECK_FINAL',
    incomes: 'INCOMES',
    cashInit: 'CASH_INIT',
    checkInit: 'CHECK_INIT',
    verification: 'VERIFICATION',
    debe: 'DEBE',
    haber: 'HABER',
    currency: 'CURRENCY',
    init: 'INIT',
    fetching: 'FETCHING',
    error: 'ERROR',
    egressUser: 'EGRESS_USER',
    isEgressInit: 'EGRESS_INIT',
    isEgressSelectUser: 'EGRESS_SELECT_USER',
    isEgress: 'EGRESS',
    userSearch: 'USER_SEARCH',
    name: 'NAME',
    lastName: 'LAST_NAME',
    company: 'COMPANY',
    nifType: 'NIF_TYPE',
    nif: 'NIF',
    address: 'ADDRESS',
    address2: 'ADDRESS_2',
    city: 'CITY',
    state: 'STATE',
    country: 'COUNTRY',
    postCode: 'POST_CODE',
    email: 'EMAIL',
    phone: 'PHONE',
  };
  
  const reducerObject = (state, payload) => ({
    [actionTypes.init]: {
        ...state,
        isInit: true,
        isFetching: false,
    },
    [actionTypes.fetching]: {
        ...state,
        isInit: false,
        isFetching: true,
    },
    [actionTypes.expenses]: {
        ...state,
        expenses: payload,
    },
    [actionTypes.cashFinal]: {
        ...state,
        cashFinal: payload,
    },
    [actionTypes.checkFinal]: {
        ...state,
        checkFinal: payload,
    },
    [actionTypes.incomes]: {
        ...state,
        incomes: payload,
    },
    [actionTypes.cashInit]: {
        ...state,
        cashInit: payload,
    },
    [actionTypes.checkInit]: {
        ...state,
        checkInit: payload,
    },
    [actionTypes.verification]: {
        ...state,
        verification: payload,
    },
    [actionTypes.debe]: {
        ...state,
        debe: payload,
    },
    [actionTypes.haber]: {
        ...state,
        haber: payload,
    },
    [actionTypes.currency]: {
        ...state,
        currency: payload,
    },
    [actionTypes.error]: {
        ...state,
        error: payload,
    },
    [actionTypes.egressUser]: {
        ...state,
        egressUser: payload,
    },
    [actionTypes.isEgressInit]: {
        ...state,
        isEgressInit: true,
        isEgressSelectUser: false, 
        isEgress: false
    },
    [actionTypes.isEgressSelectUser]: {
        ...state,
        isEgressInit: false,
        isEgressSelectUser: true, 
        isEgress: false
    },
    [actionTypes.isEgress]: {
        ...state,
        isEgressInit: false,
        isEgressSelectUser: false, 
        isEgress: true
    },
    [actionTypes.userSearch]: {
        ...state,
        userSearch: payload,
    },
    [actionTypes.name]: {
        ...state,
        name: payload,
    },
    [actionTypes.lastName]: {
        ...state,
        lastName: payload,
    },
    [actionTypes.company]: {
        ...state,
        company: payload,
    },
    [actionTypes.nifType]: {
        ...state,
        nifType: payload,
    },
    [actionTypes.nif]: {
        ...state,
        nif: payload,
    },
    [actionTypes.address]: {
        ...state,
        address: payload,
    },
    [actionTypes.address2]: {
        ...state,
        address2: payload,
    },
    [actionTypes.city]: {
        ...state,
        city: payload,
    },
    [actionTypes.state]: {
        ...state,
        stateCountry: payload,
    },
    [actionTypes.country]: {
        ...state,
        country: payload,
    },
    [actionTypes.postCode]: {
        ...state,
        postCode: payload,
    },
    [actionTypes.email]: {
        ...state,
        email: payload,
    },
    [actionTypes.phone]: {
        ...state,
        phone: payload,
    },
  });
  
  const reducer = (state, action) => {
      return reducerObject(state, action.payload)[action.type] || state;
  };
  
  export { useGafpriCashRegister };