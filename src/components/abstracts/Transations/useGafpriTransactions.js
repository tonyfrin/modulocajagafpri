import React from 'react';
import { gafpriFetch } from '../Context/gafpriFetch';


function useGafpriTransactions(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const {
    selectUser,
    userSearch,
    isUser,
    isSelectUser,
    isTransactions,
  } = state;

/**
 * Path Actions
 *
 * 
 */

    const onIsUser = () => dispatch({
        type: actionTypes.isUser,
    });

    const onIsSelectUser = () => dispatch({
        type: actionTypes.isSelectUser,
    });

    const onIsTransactions = () => dispatch({
        type: actionTypes.isTransactions,
    });
    

    

/**
 * Set Actions
 *
 * 
 */

    const setSelectUser = (newData) => dispatch({
        type: actionTypes.selectUser,
        payload: newData,
    });

    const setUserSearch = (newData) => dispatch({
        type: actionTypes.userSearch,
        payload: newData,
    });

/**
 * Actions Transaction
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
            setSelectUser(dataUser[0]);
            onIsTransactions();
        } else{
            setUserSearch(props.users.users.data.users);
            onIsSelectUser();
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
        onIsSelectUser();
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
            setSelectUser(dataUser[0]);
            onIsTransactions();
        } else{
            setUserSearch(props.users.users.data.users);
            onIsSelectUser();
        }
    }
}

function userSelect(user){
    setSelectUser(user)
    onIsTransactions();
}

function addTransfers(transfer){
    gafpriFetch({
        initMethod: 'POST', 
        initApi: props.source.api, 
        initRoute: props.route, 
        initCredentials: transfer,
        initToken: props.currentUser, 
        functionFetching: props.mainActions.onFetching,
        functionSuccess: successTransfer,
        functionError: changeError,
      });
}

function successTransfer(newData){
    props.onInit();

    if(newData.crTransaction !== undefined){
        if(newData.crTransaction.success){
            props.cr.getCrTransactionData(newData.crTransaction);
        }
    }
    
    if(newData.crCash !== undefined){
        if(newData.crCash.success){
            props.cr.getCrCashData(newData.crCash);
        }
    }

    if(newData.expensesTransactions !== undefined){
        if(newData.expensesTransactions.success){
            props.expensesTransactions.getExpensesTransactionsData(newData.expensesTransactions);
        }
    }

    onIsUser();
}


function changeError(newData){
    props.mainActions.setError(newData.data);
    props.onInit();
    onIsUser();
    setTimeout(() => {
       props.mainActions.setError([]);
    }, 10000);
}
    


/**
 * Export Status and Actions
 *
 * 
 */

    const states = {
        selectUser,
        isUser,
        isSelectUser,
        isTransactions,
        userSearch,
    }

    const actions = {
        onIsUser,
        onIsSelectUser,
        onIsTransactions,
        changeUserNif,
        changeUserName,
        changeUserEmail,
        userSelect,
        setUserSearch,
        setSelectUser,
        addTransfers,
    }

    return {
        states,
        actions,
    };

}

const initialState = () => ({
    selectUser: [],
    isUser: true,
    isSelectUser: false,
    isTransactions: false,
    userSearch: [],
});

const actionTypes = {
    selectUser: 'SELECT_USER',
    isUser: 'IS_USER',
    isSelectUser: 'IS_SELECT_USER',
    isTransactions: 'IS_TRANSACTIONS',
    userSearch: 'USER_SEARCH',
};

const reducerObject = (state, payload) => ({
    [actionTypes.selectUser]: {
        ...state,
        selectUser: payload,
    },
    [actionTypes.isUser]: {
        ...state,
        isUser: true,
        isSelectUser: false,
        isTransactions: false,
    },
    [actionTypes.isSelectUser]: {
        ...state,
        isUser: false,
        isSelectUser: true,
        isTransactions: false,
    },
    [actionTypes.isTransactions]: {
        ...state,
        isUser: false,
        isSelectUser: false,
        isTransactions: true,
    },
    [actionTypes.userSearch]: {
        ...state,
        userSearch: payload,
    },
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
};

export { useGafpriTransactions };