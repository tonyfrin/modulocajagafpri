import React from 'react';
import { gafpriFetch } from '../components/abstracts/Context/gafpriFetch';
import { getItem, saveItem } from '../components/abstracts/Context/localStorage';
import LogoMain from "../assets/img/logo.png";
import LogoWhite from "../assets/img/logo-blanco.png";


function useGafpriAdmin() {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const {
    source,

    whiteLogo,
    MainLogo,

    isLogin,
    username,
    password,
    currentUser,

    isFetching,
    isError,
    error,
    
    users,
    usersIsReady,

    products,
    productsIsReady,

    orders,
    ordersIsReady,

    budgets,
    budgetsIsReady,

    credits,
    creditsIsReady,

    accounting,
    accountingIsReady,

    purchases,
    purchasesIsReady,

    liabilities,
    liabilitiesIsReady,

    cr,
    crIsReady,
    crTransaction,
    crTransactionIsReady,
    crCheck,
    crCheckIsReady,
    crCash,
    crCashIsReady,

    bankTransactions,
    bankTransactionsIsReady,

    expensesTransactions,
    expensesTransactionsIsReady,

    pm,
    pmIsReady,

    payments,
    paymentsIsReady,
  } = state;

/**
 * Effects
 *
 * 
 */

  React.useEffect(() => {
    getUsers();
    getProducts();
    getOrders();
    getBudgets();
    getCredits();
    getAccounting();
    getPurchases();
    getLiabilities();
    getCr();
    getCrTransaction();
    getCrCheck();
    getCrCash();
    getBankTransactions();
    getExpensesTransactions();
    getPm();
    getPayments();
  }, [isLogin]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if(usersIsReady && productsIsReady && ordersIsReady && budgetsIsReady && creditsIsReady && accountingIsReady && purchasesIsReady && liabilitiesIsReady && crIsReady && crTransactionIsReady && crCheckIsReady && crCashIsReady && bankTransactionsIsReady && expensesTransactionsIsReady && pmIsReady && paymentsIsReady){
      update(updateCredentials, currentUser);
    }
    verifyLogin();
  }, [isLogin, usersIsReady, productsIsReady, ordersIsReady, budgetsIsReady, creditsIsReady, accountingIsReady, purchasesIsReady, liabilitiesIsReady, crIsReady, crTransactionIsReady, crCheckIsReady, crCashIsReady, bankTransactionsIsReady, expensesTransactionsIsReady, pmIsReady, paymentsIsReady]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    verifyLogin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

/**
 * Actions on Update
 *
 * 
 */

const updateCredentials = {
  users: {
    date: `${users.data.date}`,
    count: `${users.data.count}`,
    liveDate: 'GS_USERS_DATE_V1',
    liveCount: 'GS_USERS_COUNT_V1',
  },
  products: {
    date: `${products.data.date}`,
    count: `${products.data.count}`,
    liveDate: 'GS_PRODUCTS_DATE_V1',
    liveCount: 'GS_PRODUCTS_COUNT_V1',
  },
  orders: {
    date: `${orders.data.date}`,
    count: `${orders.data.count}`,
    liveDate: 'GS_ORDERS_DATE_V1',
    liveCount: 'GS_ORDERS_COUNT_V1',
  },
  budgets: {
    date: `${budgets.data.date}`,
    count: `${budgets.data.count}`,
    liveDate: 'GS_BUDGETS_DATE_V1',
    liveCount: 'GS_BUDGETS_COUNT_V1',
  },
  credits: {
    date: `${credits.data.date}`,
    count: `${credits.data.count}`,
    liveDate: 'GS_CREDITS_DATE_V1',
    liveCount: 'GS_CREDITS_COUNT_V1',
  },
  purchases: {
    date: `${purchases.data.date}`,
    count: `${purchases.data.count}`,
    liveDate: 'GS_PURCHASES_DATE_V1',
    liveCount: 'GS_PURCHASES_COUNT_V1',
  },
  liabilities: {
    date: `${liabilities.data.date}`,
    count: `${liabilities.data.count}`,
    liveDate: 'GS_LIABILITIES_DATE_V1',
    liveCount: 'GS_LIABILITIES_COUNT_V1',
  },
  cr: {
    date: `${cr.data.date}`,
    count: `${cr.data.count}`,
    liveDate: 'GS_CR_DATE_V1',
    liveCount: 'GS_CR_COUNT_V1',
  },
  crTransaction: {
    date: `${crTransaction.data.date}`,
    count: `${crTransaction.data.count}`,
    liveDate: 'GS_CR_TRANSACTION_DATE_V1',
    liveCount: 'GS_CR_TRANSACTION_COUNT_V1',
  },
  crCheck: {
    date: `${crCheck.data.date}`,
    count: `${crCheck.data.count}`,
    liveDate: 'GS_CR_CHECK_DATE_V1',
    liveCount: 'GS_CR_CHECK_COUNT_V1',
  },
  crCash: {
    date: `${crCash.data.date}`,
    count: `${crCash.data.count}`,
    liveDate: 'GS_CR_CASH_DATE_V1',
    liveCount: 'GS_CR_CASH_COUNT_V1',
  },
  bankTransactions: {
    date: `${bankTransactions.data.date}`,
    count: `${bankTransactions.data.count}`,
    liveDate: 'GS_BANK_TRANSACTIONS_DATE_V1',
    liveCount: 'GS_BANK_TRANSACTIONS_COUNT_V1',
  },
  expensesTransactions: {
    date: `${expensesTransactions.data.date}`,
    count: `${expensesTransactions.data.count}`,
    liveDate: 'GS_EXPENSES_TRANSACTIONS_DATE_V1',
    liveCount: 'GS_EXPENSES_TRANSACTIONS_COUNT_V1',
  },
  pm: {
    date: `${pm.data.date}`,
    count: `${pm.data.count}`,
    liveDate: 'GS_PM_DATE_V1',
    liveCount: 'GS_PM_COUNT_V1',
  },
  payments: {
    date: `${payments.data.date}`,
    count: `${payments.data.count}`,
    liveDate: 'GS_PAYMENTS_DATE_V1',
    liveCount: 'GS_PAYMENTS_COUNT_V1',
  }
}

const updateLive = {
  users: {
    liveDate: 'GS_USERS_DATE_V1',
    liveCount: 'GS_USERS_COUNT_V1',
  },
  products: {
    liveDate: 'GS_PRODUCTS_DATE_V1',
    liveCount: 'GS_PRODUCTS_COUNT_V1',
  },
  orders: {
    liveDate: 'GS_ORDERS_DATE_V1',
    liveCount: 'GS_ORDERS_COUNT_V1',
  },
  budgets: {
    liveDate: 'GS_BUDGETS_DATE_V1',
    liveCount: 'GS_BUDGETS_COUNT_V1',
  },
  credits: {
    liveDate: 'GS_CREDITS_DATE_V1',
    liveCount: 'GS_CREDITS_COUNT_V1',
  },
  purchases: {
    liveDate: 'GS_PURCHASES_DATE_V1',
    liveCount: 'GS_PURCHASES_COUNT_V1',
  },
  liabilities: {
    liveDate: 'GS_LIABILITIES_DATE_V1',
    liveCount: 'GS_LIABILITIES_COUNT_V1',
  },
  cr: {
    liveDate: 'GS_CR_DATE_V1',
    liveCount: 'GS_CR_COUNT_V1',
  },
  crTransaction: {
    liveDate: 'GS_CR_TRANSACTION_DATE_V1',
    liveCount: 'GS_CR_TRANSACTION_COUNT_V1',
  },
  crCheck: {
    liveDate: 'GS_CR_CHECK_DATE_V1',
    liveCount: 'GS_CR_CHECK_COUNT_V1',
  },
  crCash: {
    liveDate: 'GS_CR_CASH_DATE_V1',
    liveCount: 'GS_CR_CASH_COUNT_V1',
  },
  bankTransactions: {
    liveDate: 'GS_BANK_TRANSACTIONS_DATE_V1',
    liveCount: 'GS_BANK_TRANSACTIONS_COUNT_V1',
  },
  expensesTransactions: {
    liveDate: 'GS_EXPENSES_TRANSACTIONS_DATE_V1',
    liveCount: 'GS_EXPENSES_TRANSACTIONS_COUNT_V1',
  },
  pm: {
    liveDate: 'GS_PM_DATE_V1',
    liveCount: 'GS_PM_COUNT_V1',
  },
  payments: {
    liveDate: 'GS_PAYMENTS_DATE_V1',
    liveCount: 'GS_PAYMENTS_COUNT_V1',
  }
}

const update = (updateCredentials, currentUser) => {
  if(isLogin){
    if(currentUser !== null){
      gafpriFetch({
        initMethod: 'POST', 
        initApi: source.api, 
        initRoute: 'gafpriadmin/v1/db/update', 
        initCredentials: updateCredentials,
        initToken: currentUser,
        functionSuccess: updateSuccess,
        onLive: update,
        updateLive: updateLive,
      });
    }
  }
}

const updateSuccess = (newData) => {
  if(newData.users.success){
    getUsersData(newData.users);
  }

  if(newData.products.success){
    getProductsData(newData.products);
  }

  if(newData.orders.success){
    getOrdersData(newData.orders);
  }

  if(newData.budgets.success){
    getBudgetsData(newData.budgets);
  }

  if(newData.credits.success){
    getCreditsData(newData.credits);
  }

  if(newData.accounting.success){
    getAccountingData(newData.accounting);
  }

  if(newData.purchases.success){
    getPurchasesData(newData.purchases);
  }

  if(newData.liabilities.success){
    getLiabilitiesData(newData.liabilities);
  }

  if(newData.cr.success){
    getCrData(newData.cr);
  }

  if(newData.crTransaction.success){
    getCrTransactionData(newData.crTransaction);
  }

  if(newData.crCheck.success){
    getCrCheckData(newData.crCheck);
  }

  if(newData.crCash.success){
    getCrCashData(newData.crCash);
  }

  if(newData.bankTransactions.success){
    getBankTransactionsData(newData.bankTransactions);
  }

  if(newData.expensesTransactions.success){
    getExpensesTransactionsData(newData.expensesTransactions);
  }

  if(newData.pm.success){
    getPmData(newData.pm);
  }

  if(newData.payments.success){
    getPaymentsData(newData.payments);
  }
  
}


/**
 * Status and Actions on Fetchin
 *
 * 
 */

  const onFetching = () => dispatch({
    type: actionTypes.fetching,
  });

/**
 * Status and Actions on Login
 *
 * 
 */

  const onLogin = (newData) => {
    dispatch({
      type: actionTypes.login,
      payload: newData.data,
    });
    saveItem('GS_CURRENT_USER_V1', newData.data);
  }

  const onVerifyLogin = () => dispatch({
    type: actionTypes.verifyLogin,
  });

  const onLogOut = () => {
    dispatch({
      type: actionTypes.logOut,
    });
    saveItem('GS_CURRENT_USER_V1', null);
    resetUsersData();
    resetProductsData();
    resetOrdersData();
    resetBudgetsData();
    resetCreditsData();
    resetAccountingData();
    resetPurchasesData();
    resetLiabilitiesData();
    resetCrData();
    resetCrTransactionData();
    resetCrCheckData();
    resetCrCashData();
    resetBankTransactionsData();
    resetExpensesTransactionsData();
    resetPmData();
    resetPaymentsData();
  }

  const writeUsername = (newUsername) => dispatch({
    type: actionTypes.writeUsername,
    payload: newUsername,
  });

  const writePassword = (newPassword) => dispatch({
    type: actionTypes.writePassword,
    payload: newPassword,
  });

  const onErrorLogin = (newError) => {
    dispatch({
      type: actionTypes.error,
      payload: newError,
    });
    onLogOut();
  };

  const login = () => {
      gafpriFetch({
      initMethod: 'POST', 
      initApi: source.api, 
      initRoute: 'jwt-auth/v1/token', 
      initCredentials: {
        username: username,
        password: password,
      }, 
      functionFetching: onFetching,
      functionSuccess: onLogin,
      functionError: onErrorLogin,
    });
  }

  const verifyLogin = () => {
    if(currentUser !== null){
      gafpriFetch({
        initMethod: 'POST', 
        initApi: source.api, 
        initRoute: 'jwt-auth/v1/token/validate', 
        initToken: currentUser, 
        functionFetching: onFetching,
        functionSuccess: onVerifyLogin,
        functionError: onErrorLogin,
      });
    } else{
      onLogOut();
    }
  }

/**
 * Status and Actions on Users
 *
 * 
 */

  const onFetchingUsers = () => dispatch({
    type: actionTypes.onFetchingUsers,
  });

  const getUsersData = (newData) => {
    if(isLogin){
      if(currentUser !== null){
        dispatch({
          type: actionTypes.users,
          payload: newData,
        });
        saveItem('GS_USERS_V1', newData.data.users);
        saveItem('GS_USERS_DATE_V1', newData.data.date);
        saveItem('GS_USERS_COUNT_V1', newData.data.count);
      }
    }
  } 

  const usersReady = () => {
    dispatch({
      type: actionTypes.usersReady,
    });
  }

  const onUsers = (newData) => {
    getUsersData(newData);
    usersReady();
  }

  const resetUsersData = () => {
    const newData = {
      data:{ 
        date: '0000-00-00 00:00:00',
        count: 0,
        users: null,
      }
    }
    getUsersData(newData);
    onFetchingUsers();
  }

  const getUsers = () => {
    if(users.data.users === null){
      if(currentUser !== null){
        gafpriFetch({
          initMethod: 'POST', 
          initApi: source.api, 
          initRoute: 'gafpriadmin/v1/users', 
          initCredentials: {
            date: `${users.data.date}`,
            count: `${users.data.count}`
          },
          initToken: currentUser, 
          functionFetching: onFetchingUsers,
          functionSuccess: onUsers,
        });
      }
    } else{
      usersReady();
    }
  }

  function getUserById(userId){
      let dataUser = users.data.users.filter(function(data){
          if(data.id === `${userId}`){
              return true;
          }else{
              return false;
          }
      });
      return dataUser[0];
  }

  function getUserInfo(userId, key){
    let value = null;
    users.data.users.map((user) => {
      if(`${user.id}` === `${userId}`){
        value = user[key]; 
      }
      return null;
    })
    return value;
  }



  const usersDb ={
    users,
    getUserById,
    getUserInfo,
  }
  

/**
 * Status and Actions on Products
 *
 * 
 */

  const onFetchingProducts = () => dispatch({
    type: actionTypes.onFetchingProducts,
  });

  const getProductsData = (newData) => {
    if(isLogin){
      if(currentUser !== null){
        dispatch({
          type: actionTypes.products,
          payload: newData,
        });
        saveItem('GS_PRODUCTS_V1', newData.data.products);
        saveItem('GS_PRODUCTS_DATE_V1', newData.data.date);
        saveItem('GS_PRODUCTS_COUNT_V1', newData.data.count);
      }
    }
  } 

  const productsReady = () => {
    dispatch({
      type: actionTypes.productsReady,
    });
  }

  const onProducts = (newData) => {
    getProductsData(newData);
    productsReady();
  }

  const resetProductsData = () => {
    const newData = {
      data:{ 
        date: '0000-00-00 00:00:00',
        count: 0,
        products: null,
      }
    }
    getProductsData(newData);
    onFetchingProducts();
  }

  const getProducts = () => {
    if(products.data.products === null){
      if(currentUser !== null){
        gafpriFetch({
          initMethod: 'POST', 
          initApi: source.api, 
          initRoute: 'gafpriadmin/v1/producto', 
          initCredentials: {
            date: `${products.data.date}`,
            count: `${products.data.count}`
          },
          initToken: currentUser, 
          functionFetching: onFetchingProducts,
          functionSuccess: onProducts,
        });
      }
    } else{
      productsReady();
    }
  }


/**
 * Status and Actions on Orders
 *
 * 
 */

  const onFetchingOrders = () => dispatch({
    type: actionTypes.onFetchingOrders,
  });

  const getOrdersData = (newData) => {
    if(isLogin){
      if(currentUser !== null){
        dispatch({
          type: actionTypes.orders,
          payload: newData,
        });
        saveItem('GS_ORDERS_V1', newData.data.orders);
        saveItem('GS_ORDERS_DATE_V1', newData.data.date);
        saveItem('GS_ORDERS_COUNT_V1', newData.data.count);
      }
    }
  } 

  const ordersReady = () => {
    dispatch({
      type: actionTypes.ordersReady,
    });
  }

  const onOrders = (newData) => {
    getOrdersData(newData);
    ordersReady();
  }

  const resetOrdersData = () => {
    const newData = {
      data:{ 
        date: '0000-00-00 00:00:00',
        count: 0,
        orders: null,
      }
    }
    getOrdersData(newData);
    onFetchingOrders();
  }

  const getOrders = () => {
    if(orders.data.orders === null){
      if(currentUser !== null){
        gafpriFetch({
          initMethod: 'POST', 
          initApi: source.api, 
          initRoute: 'gafpriadmin/v1/orders', 
          initCredentials: {
            date: `${orders.data.date}`,
            count: `${orders.data.count}`
          },
          initToken: currentUser, 
          functionFetching: onFetchingOrders,
          functionSuccess: onOrders,
        });
      }
    } else{
      ordersReady();
    }
  }

  function getOrderProductsById(orderId){
    let dataOrder = orders.data.orders.filter(function(data){
      if(data.id === `${orderId}`){
          return true;
      }else{
          return false;
      }
    });
    return dataOrder[0].products;
  }

  function updateItemsOrder(orderId, products, total){
    const dateOrder = orders.data.date;
    const countOrder = orders.data.count;
    let newItems = [];

    orders.data.orders.map((order) => {
      if(`${order.id}` === `${orderId}`){
        newItems.push({
          createdVia: order.createdVia,
          dateCreated: order.dateCreated,
          dateModified: order.dateModified,
          id: order.id,
          notes: order.notes,
          paymentMethodTitle: order.paymentMethodTitle,
          products: products,
          remainingRefundAmount: total,
          status: order.status,
          total: total,
          transactionId: order.transactionId,
          userId: order.userId,
          userName: order.userName,
      });
      } else{
        newItems.push(order);
      }
      return null;
    });


    const newDataOrders = {
      data:{ 
        date: dateOrder,
        count: countOrder,
        orders: newItems,
      }
    }

    getOrdersData(newDataOrders);
  }

  function updateStatusOrder (orderId, status){
    let date = orders.data.date;
    let count = orders.data.count;
    let newOrders = [];
    orders.data.orders.map((order) => {
        if(order.id === orderId){
            newOrders.push({
              createdVia: order.createdVia,
              dateCreated: order.dateCreated,
              dateModified: order.dateModified,
              id: order.id,
              notes: order.notes,
              paymentMethodTitle: order.paymentMethodTitle,
              products: order.products,
              remainingRefundAmount: order.remainingRefundAmount,
              status: status,
              total: order.total,
              transactionId: order.transactionId,
              userId: order.userId,
              userName: order.userName,
            });
        } else{
            newOrders.push(order);
        }
        return null;
    });
    const newDataOrders = {
        data:{
            date: date,
            count: count,
            orders: newOrders, 
        }
    }
    getOrdersData(newDataOrders);
  }

  function getOrderInfo(orderId, key){
    let value = null;
    orders.data.orders.map((order) => {
      if(`${order.id}` === `${orderId}`){
        value = order[key]; 
      }
      return null;
    })
    return value;
  }

  const ordersDb = {
    orders,
    getOrderProductsById,
    updateItemsOrder,
    updateStatusOrder,
    getOrderInfo,
  }
  
/**
 * Status and Actions on Budget
 *
 * 
 */

  const onFetchingBudgets = () => dispatch({
    type: actionTypes.onFetchingBudgets,
  });

  const getBudgetsData = (newData) => {
    if(isLogin){
      if(currentUser !== null){
        dispatch({
          type: actionTypes.budgets,
          payload: newData,
        });
        saveItem('GS_BUDGETS_V1', newData.data.budgets);
        saveItem('GS_BUDGETS_DATE_V1', newData.data.date);
        saveItem('GS_BUDGETS_COUNT_V1', newData.data.count);
      }
    }
  } 

  const budgetsReady = () => {
    dispatch({
      type: actionTypes.budgetsReady,
    });
  }

  const onBudgets = (newData) => {
    getBudgetsData(newData);
    budgetsReady();
  }

  const resetBudgetsData = () => {
    const newData = {
      data:{ 
        date: '0000-00-00 00:00:00',
        count: 0,
        budgets: null,
      }
    }
    getBudgetsData(newData);
    onFetchingBudgets();
  }

  const getBudgets = () => {
    if(budgets.data.budgets === null){
      if(currentUser !== null){
        gafpriFetch({
          initMethod: 'POST', 
          initApi: source.api, 
          initRoute: 'gafpriadmin/v1/budgets', 
          initCredentials: {
            date: `${budgets.data.date}`,
            count: `${budgets.data.count}`
          },
          initToken: currentUser, 
          functionFetching: onFetchingBudgets,
          functionSuccess: onBudgets,
        });
      }
    } else{
      budgetsReady();
    }
  }

/**
 * Status and Actions on Credits
 *
 * 
 */

  const onFetchingCredits = () => dispatch({
    type: actionTypes.onFetchingCredits,
  });

  const getCreditsData = (newData) => {
    if(isLogin){
      if(currentUser !== null){
        dispatch({
          type: actionTypes.credits,
          payload: newData,
        });
        saveItem('GS_CREDITS_V1', newData.data.credits);
        saveItem('GS_CREDITS_DATE_V1', newData.data.date);
        saveItem('GS_CREDITS_COUNT_V1', newData.data.count);
      }
    }
  } 

  const creditsReady = () => {
    dispatch({
      type: actionTypes.creditsReady,
    });
  }

  const onCredits = (newData) => {
    getCreditsData(newData);
    creditsReady();
  }

  const resetCreditsData = () => {
    const newData = {
      data:{ 
        date: '0000-00-00 00:00:00',
        count: 0,
        credits: null,
      }
    }
    getCreditsData(newData);
    onFetchingCredits();
  }

  const getCredits = () => {
    if(credits.data.credits === null){
      if(currentUser !== null){
        gafpriFetch({
          initMethod: 'POST', 
          initApi: source.api, 
          initRoute: 'gafpriadmin/v1/credits', 
          initCredentials: {
            date: `${credits.data.date}`,
            count: `${credits.data.count}`
          },
          initToken: currentUser, 
          functionFetching: onFetchingCredits,
          functionSuccess: onCredits,
        });
      }
    } else{
      creditsReady();
    }
  }

  function getUsersCredits(){
    let usersCredits = [];
    credits.data.credits.map((credit) => {
      if(credit.status === "gs_active"){
        if(! usersCredits.includes(credit.userId)){
          usersCredits.push(credit.userId);
        }
      }
      return null;
    })
    return usersCredits;
  }

  function getBalanceByUserId(userId){
    let balance = 0;
    credits.data.credits.map((credit) => {
      if(`${credit.userId}` === `${userId}`){
        balance += credit.balance;
      }
      return null;
    })
    return balance;
  }

  function getUsersCreditsInfo(){
    const userCredits = getUsersCredits();
    let userCreditsInfo = [];
    userCredits.map((userId) => {
      let userInfo = {
        userId: userId,
        nifType: getUserInfo(userId, 'nifType'),
        nif: getUserInfo(userId, 'nif'),
        name: getUserInfo(userId, 'name'),
        email: getUserInfo(userId, 'email'),
        phone: getUserInfo(userId, 'phone'),
        balance: getBalanceByUserId(userId),
      }
      userCreditsInfo.push(userInfo);
      return null;
    })
    userCreditsInfo.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
    return userCreditsInfo;
  }

  function getActiveCreditsByUserId(userId){
    let activeCredits = [];
    credits.data.credits.map((credit) => {
      if(`${credit.userId}` === `${userId}` && credit.status === "gs_active"){
        activeCredits.push(credit);
      }
      return null;
    })
    return activeCredits;
  }

  function getCreditInfo(creditId, key){
    let value = null;
    credits.data.credits.map((credit) => {
      if(`${credit.id}` === `${creditId}`){
        value = credit[key]; 
      }
      return null;
    })
    return value;
  }

  const creditsDb = {
    credits,
    getUsersCreditsInfo,
    getActiveCreditsByUserId,
    getCreditInfo,
  }

/**
 * States and Actions on Accounting
 *
 * 
 */

  const onFetchingAccounting = () => dispatch({
    type: actionTypes.onFetchingAccounting,
  });

  const getAccountingData = (newData) => {
    if(isLogin){
      if(currentUser !== null){
        dispatch({
          type: actionTypes.accounting,
          payload: newData,
        });
        saveItem('GS_BANKS_V1', newData.banks);
        saveItem('GS_PROJECT_V1', newData.project);
        saveItem('GS_EXPENSES_V1',newData.expenses);
        saveItem('GS_TDC_V1', newData.tdc);
      }
    }
  } 

  const accountingReady = () => {
    dispatch({
      type: actionTypes.accountingReady,
    });
  }

  const onAccounting = (newData) => {
    getAccountingData(newData);
    accountingReady();
  }

  const resetAccountingData = () => {
    const newData = {
      banks: null,
      project: null,
      expenses: null,
      tdc: null,
    }
    getAccountingData(newData);
    onFetchingAccounting();
  }

  const getAccounting = () => {
    if(accounting.banks === null){
      if(currentUser !== null){
        gafpriFetch({
          initMethod: 'POST', 
          initApi: source.api, 
          initRoute: 'gafpriadmin/v1/accounting',
          initToken: currentUser, 
          functionFetching: onFetchingAccounting,
          functionSuccess: onAccounting,
        });
      }
    } else{
      accountingReady();
    }
  }

  const getBanksByType = (type) => {
    let banksType = [];
    accounting.banks.map((bank) => {
      if(bank[type]){
        banksType.push(bank);
      }
      return null;
    })
    return banksType;
  }

  function getBanksByTurned(type){
    let banksType = [];
    getBanksByType(type).map((bank) => {
        if(! getBankInfoById(bank.id, 'wallet')){
          banksType.push(bank);
        }
        return null;
    })
    return banksType;
}

  function getBankInfoById(bankId, key){
    let value = null;
    accounting.banks.map((bank) => {
      if(`${bank.id}` === `${bankId}`){
        value = bank[key]; 
      }
      return null;
    })
    return value;
  }

  function getBankIdByCode(code){
    let value = null;
    accounting.banks.map((bank) => {
      if(`${bank.code}` === `${code}`){
        value = bank.id; 
      }
      return null;
    })
    return value;
  }

  function getProjectInfoById(projectId, key){
    let value = null;
    accounting.project.map((project) => {
      if(`${project.id}` === `${projectId}`){
        value = project[key]; 
      }
      return null;
    })
    return value;
  }

  function getExpensesInfoById(expensesId, key){
    let value = null;
    accounting.expenses.map((expenses) => {
      if(`${expenses.id}` === `${expensesId}`){
        value = expenses[key]; 
      }
      return null;
    })
    return value;
  }

  const accountingDb = {
    accounting,
    getBanksByType,
    getBankInfoById,
    getBanksByTurned,
    getBankIdByCode,
    getProjectInfoById,
    getExpensesInfoById,
  }


/**
 * States and Actions on Purchases
 *
 * 
*/

  const onFetchingPurchases = () => dispatch({
    type: actionTypes.onFetchingPurchases,
  });

  const getPurchasesData = (newData) => {
    if(isLogin){
      if(currentUser !== null){
        dispatch({
          type: actionTypes.purchases,
          payload: newData,
        });
        saveItem('GS_PURCHASES_V1', newData.data.purchases);
        saveItem('GS_PURCHASES_DATE_V1', newData.data.date);
        saveItem('GS_PURCHASES_COUNT_V1', newData.data.count);
      }
    }
  } 

  const purchasesReady = () => {
    dispatch({
      type: actionTypes.purchasesReady,
    });
  }

  const onPurchases = (newData) => {
    getPurchasesData(newData);
    purchasesReady();
  }

  const resetPurchasesData = () => {
    const newData = {
      data:{ 
        date: '0000-00-00 00:00:00',
        count: 0,
        purchases: null,
      }
    }
    getPurchasesData(newData);
    onFetchingPurchases();
  }

  const getPurchases = () => {
    if(purchases.data.purchases === null){
      if(currentUser !== null){
        gafpriFetch({
          initMethod: 'POST', 
          initApi: source.api, 
          initRoute: 'gafpriadmin/v1/purchases', 
          initCredentials: {
            date: `${credits.data.date}`,
            count: `${credits.data.count}`
          },
          initToken: currentUser, 
          functionFetching: onFetchingPurchases,
          functionSuccess: onPurchases,
        });
      }
    } else{
      purchasesReady();
    }
  }

  function updateItemsPurchase(purchaseId, products, total){
    const datePurchase = purchases.data.date;
    const countPurchase = purchases.data.count;
    let newItems = [];

    purchases.data.purchases.map((purchase) => {
      if(`${purchase.id}` === `${purchaseId}`){
        newItems.push({
          dateCreated: purchase.dateCreated,
          dateModified: purchase.dateModified,
          id: purchase.id,
          products: products,
          status: purchase.status,
          total: total,
          userId: purchase.userId,
          userName: purchase.userName,
      });
      } else{
        newItems.push(purchase);
      }
      return null;
    });


    const newDataPurchases = {
      data:{ 
        date: datePurchase,
        count: countPurchase,
        purchases: newItems,
      }
    }

    getPurchasesData(newDataPurchases);
  }

  function getPurchaseProductsById(purchaseId){
    let dataPurchase = purchases.data.purchases.filter(function(data){
      if(data.id === `${purchaseId}`){
          return true;
      }else{
          return false;
      }
    });
    return dataPurchase[0].products;
  }

  function updateStatusPurchases (purchaseId, status){
    let date = purchases.data.date;
    let count = purchases.data.count;
    let newPurchases = [];
    purchases.data.purchases.map((purchase) => {
        if(purchase.id === purchaseId){
            newPurchases.push({
              dateCreated: purchase.dateCreated,
              dateModified: purchase.dateModified,
              id: purchase.id,
              products: purchase.products,
              status: status,
              total: purchase.total,
              userId: purchase.userId,
              userName: purchase.userName,
            });
        } else{
          newPurchases.push(purchase);
        }
        return null;
    });
    const newDataPurchases = {
        data:{
            date: date,
            count: count,
            purchases: newPurchases, 
        }
    }
    getPurchasesData(newDataPurchases);
  }

  function getPurchasesInfo(purchaseId, key){
    let value = null;
    purchases.data.purchases.map((purchase) => {
      if(`${purchase.id}` === `${purchaseId}`){
        value = purchase[key]; 
      }
      return null;
    })
    return value;
  }

  const purchasesDb = {
    purchases,
    updateItemsPurchase,
    getPurchaseProductsById,
    updateStatusPurchases,
    getPurchasesInfo,
    getPurchasesData,
  }

/**
 * Status and Actions on Liabilities
 *
 * 
 */

    const onFetchingLiabilities = () => dispatch({
      type: actionTypes.onFetchingLiabilities,
    });

    const getLiabilitiesData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.liabilities,
            payload: newData,
          });
          saveItem('GS_LIABILITIES_V1', newData.data.liabilities);
          saveItem('GS_LIABILITIES_DATE_V1', newData.data.date);
          saveItem('GS_LIABILITIES_COUNT_V1', newData.data.count);
        }
      }
    } 

    const liabilitiesReady = () => {
      dispatch({
        type: actionTypes.liabilitiesReady,
      });
    }

    const onLiabilities = (newData) => {
      getLiabilitiesData(newData);
      liabilitiesReady();
    }

    const resetLiabilitiesData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          liabilities: null,
        }
      }
      getLiabilitiesData(newData);
      onFetchingLiabilities();
    }

    const getLiabilities = () => {
      if(liabilities.data.liabilities === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/liabilities', 
            initCredentials: {
              date: `${liabilities.data.date}`,
              count: `${liabilities.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingLiabilities,
            functionSuccess: onLiabilities,
          });
        }
      } else{
        liabilitiesReady();
      }
    }

    function getActiveLiabilitiesByUserId(userId){
      let activeCredits = [];
      liabilities.data.liabilities.map((credit) => {
        if(`${credit.userId}` === `${userId}` && credit.status === "gs_active"){
          activeCredits.push(credit);
        }
        return null;
      })
      return activeCredits;
    }

    function getLiabilitiesInfo(creditId, key){
      let value = null;
      liabilities.data.liabilities.map((credit) => {
        if(`${credit.id}` === `${creditId}`){
          value = credit[key]; 
        }
        return null;
      })
      return value;
    }

    function getUsersLiabilities(){
      let usersCredits = [];
      liabilities.data.liabilities.map((credit) => {
        if(credit.status === "gs_active"){
          if(! usersCredits.includes(credit.userId)){
            usersCredits.push(credit.userId);
          }
        }
        return null;
      })
      return usersCredits;
    }

    function getLiabilitiesBalanceByUserId(userId){
      let balance = 0;
      liabilities.data.liabilities.map((credit) => {
        if(`${credit.userId}` === `${userId}`){
          balance += credit.balance;
        }
        return null;
      })
      return balance;
    }

    function getUsersLiabilitiesInfo(){
      const userCredits = getUsersLiabilities();
      let userCreditsInfo = [];
      userCredits.map((userId) => {
        let userInfo = {
          userId: userId,
          nifType: getUserInfo(userId, 'nifType'),
          nif: getUserInfo(userId, 'nif'),
          name: getUserInfo(userId, 'name'),
          email: getUserInfo(userId, 'email'),
          phone: getUserInfo(userId, 'phone'),
          balance: getLiabilitiesBalanceByUserId(userId),
        }
        userCreditsInfo.push(userInfo);
        return null;
      })
      userCreditsInfo.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
      return userCreditsInfo;
    }

    function getLiabilitiesByPmId (pmId) {
      var newLiabilities;
      var dataLiabilities = liabilities.data.liabilities.filter(function(data){
          if(`${data.parentId}` === `${pmId}` && `${data.status}` === 'gs_active'){
              return true;
          }else{
              return false;
          }
      });
      if(dataLiabilities.length > 0){
          newLiabilities = {
            success: true,
            liabilities: dataLiabilities[0],
          };
      } else{
        newLiabilities = {
          success: false,
        };
      }
      return newLiabilities;
  }

    const liabilitiesDB = {
      liabilities,
      getActiveLiabilitiesByUserId,
      getLiabilitiesInfo,
      getUsersLiabilitiesInfo,
    }


/**
 * Status and Actions on Cash Register
 *
 * 
 */

    const onFetchingCr = () => dispatch({
      type: actionTypes.onFetchingCr,
    });

    const getCrData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.cr,
            payload: newData,
          });
          saveItem('GS_CR_V1', newData.data.cr);
          saveItem('GS_CR_DATE_V1', newData.data.date);
          saveItem('GS_CR_COUNT_V1', newData.data.count);
        }
      }
    } 

    const crReady = () => {
      dispatch({
        type: actionTypes.crReady,
      });
    }

    const onCr = (newData) => {
      getCrData(newData);
      crReady();
    }

    const resetCrData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          cr: null,
        }
      }
      getCrData(newData);
      onFetchingCr();
    }

    const getCr = () => {
      if(cr.data.cr === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/cr/active', 
            initCredentials: {
              date: `${cr.data.date}`,
              count: `${cr.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingCr,
            functionSuccess: onCr,
          });
        }
      } else{
        crReady();
      }
    }

    const onFetchingCrTransaction = () => dispatch({
      type: actionTypes.onFetchingCrTransaction,
    });

    const getCrTransactionData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.crTransaction,
            payload: newData,
          });
          saveItem('GS_CR_TRANSACTION_V1', newData.data.crTransaction);
          saveItem('GS_CR_TRANSACTION_DATE_V1', newData.data.date);
          saveItem('GS_CR_TRANSACTION_COUNT_V1', newData.data.count);
        }
      }
    } 

    const crTransactionReady = () => {
      dispatch({
        type: actionTypes.crTransactionReady,
      });
    }

    const onCrTransaction = (newData) => {
      getCrTransactionData(newData);
      crTransactionReady();
    }

    const resetCrTransactionData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          crTransaction: null,
        }
      }
      getCrTransactionData(newData);
      onFetchingCrTransaction();
    }

    const getCrTransaction = () => {
      if(crTransaction.data.crTransaction === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/cr/active-transaction', 
            initCredentials: {
              date: `${crTransaction.data.date}`,
              count: `${crTransaction.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingCrTransaction,
            functionSuccess: onCrTransaction,
          });
        }
      } else{
        crTransactionReady();
      }
    }

    const onFetchingCrCheck = () => dispatch({
      type: actionTypes.onFetchingCrCheck,
    });

    const getCrCheckData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.crCheck,
            payload: newData,
          });
          saveItem('GS_CR_CHECK_V1', newData.data.crCheck);
          saveItem('GS_CR_CHECK_DATE_V1', newData.data.date);
          saveItem('GS_CR_CHECK_COUNT_V1', newData.data.count);
        }
      }
    } 

    const crCheckReady = () => {
      dispatch({
        type: actionTypes.crCheckReady,
      });
    }

    const onCrCheck = (newData) => {
      getCrCheckData(newData);
      crCheckReady();
    }

    const resetCrCheckData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          crCheck: null,
        }
      }
      getCrCheckData(newData);
      onFetchingCrCheck();
    }

    const getCrCheck = () => {
      if(crCheck.data.crCheck === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/cr/active-check', 
            initCredentials: {
              date: `${crCheck.data.date}`,
              count: `${crCheck.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingCrCheck,
            functionSuccess: onCrCheck,
          });
        }
      } else{
        crCheckReady();
      }
    }

    const onFetchingCrCash = () => dispatch({
      type: actionTypes.onFetchingCrCash,
    });

    const getCrCashData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.crCash,
            payload: newData,
          });
          saveItem('GS_CR_CASH_V1', newData.data.crCash);
          saveItem('GS_CR_CASH_DATE_V1', newData.data.date);
          saveItem('GS_CR_CASH_COUNT_V1', newData.data.count);
        }
      }
    }

    const crCashReady = () => {
      dispatch({
        type: actionTypes.crCashReady,
      });
    }

    const onCrCash = (newData) => {
      getCrCashData(newData);
      crCashReady();
    }

    const resetCrCashData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          crCash: null,
        }
      }
      getCrCashData(newData);
      onFetchingCrCash();
    }

    const getCrCash = () => {
      if(crCash.data.crCash === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/cr/active-cash', 
            initCredentials: {
              date: `${crCash.data.date}`,
              count: `${crCash.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingCrCash,
            functionSuccess: onCrCash,
          });
        }
      } else{
        crCashReady();
      }
    }

    const crDB = {
      cr,
      crTransaction,
      crCheck,
      crCash,
      getCrTransactionData,
      getCrCashData,
    }

/**
 * Status and Actions on Bank Transactions
 *
 * 
 */

    const onFetchingBankTransactions = () => dispatch({
      type: actionTypes.onFetchingBankTransactions,
    });

    const getBankTransactionsData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.bankTransactions,
            payload: newData,
          });
          saveItem('GS_BANK_TRANSACTIONS_V1', newData.data.bankTransactions);
          saveItem('GS_BANK_TRANSACTIONS_DATE_V1', newData.data.date);
          saveItem('GS_BANK_TRANSACTIONS_COUNT_V1', newData.data.count);
        }
      }
    } 

    const bankTransactionsReady = () => {
      dispatch({
        type: actionTypes.bankTransactionsReady,
      });
    }

    const onBankTransactions = (newData) => {
      getBankTransactionsData(newData);
      bankTransactionsReady();
    }

    const resetBankTransactionsData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          bankTransactions: null,
        }
      }
      getBankTransactionsData(newData);
      onFetchingBankTransactions();
    }

    const getBankTransactions = () => {
      if(bankTransactions.data.bankTransactions === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/bank', 
            initCredentials: {
              date: `${bankTransactions.data.date}`,
              count: `${bankTransactions.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingBankTransactions,
            functionSuccess: onBankTransactions,
          });
        }
      } else{
        bankTransactionsReady();
      }
    }

    function getTransfersBankByCode(bankCode){
      let newData = bankTransactions.data.bankTransactions.filter(function(data){
        if(`${data.bank}` === `${bankCode}`){
            return true;
        }else{
            return false;
        }
      });
      return newData;
    }

    const bankTransactionsDb = {
      bankTransactions,
      getTransfersBankByCode,
    }

/**
 * Status and Actions on Expenses Transactions
 *
 * 
 */

    const onFetchingExpensesTransactions = () => dispatch({
      type: actionTypes.onFetchingExpensesTransactions,
    });

    const getExpensesTransactionsData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.expensesTransactions,
            payload: newData,
          });
          saveItem('GS_EXPENSES_TRANSACTIONS_V1', newData.data.expensesTransactions);
          saveItem('GS_EXPENSES_TRANSACTIONS_DATE_V1', newData.data.date);
          saveItem('GS_EXPENSES_TRANSACTIONS_COUNT_V1', newData.data.count);
        }
      }
    } 

    const expensesTransactionsReady = () => {
      dispatch({
        type: actionTypes.expensesTransactionsReady,
      });
    }

    const onExpensesTransactions = (newData) => {
      getExpensesTransactionsData(newData);
      expensesTransactionsReady();
    }

    const resetExpensesTransactionsData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          expensesTransactions: null,
        }
      }
      getExpensesTransactionsData(newData);
      onFetchingExpensesTransactions();
    }

    const getExpensesTransactions = () => {
      if(expensesTransactions.data.expensesTransactions === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/expenses', 
            initCredentials: {
              date: `${expensesTransactions.data.date}`,
              count: `${expensesTransactions.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingExpensesTransactions,
            functionSuccess: onExpensesTransactions,
          });
        }
      } else{
        expensesTransactionsReady();
      }
    }

    function getExpensesTransactionsInfoById(expensesId, key){
      let value = null;
      expensesTransactions.data.expensesTransactions.map((expenses) => {
        if(`${expenses.id}` === `${expensesId}`){
          value = expenses[key]; 
        }
        return null;
      })
      return value;
    }

    function getExpensesTransactionCreditInfo(expensesId){
      let result;
      const paymentId = getExpensesTransactionsInfoById(expensesId, 'transactionId');
      const pmIds = getPaymentInfoById(paymentId, 'pmIds');
      if(pmIds !== undefined){
        pmIds.map((pmId) => {
          const data = getLiabilitiesByPmId(pmId);
          if(data.success){
            let amount = parseFloat(data.liabilities.balance) > parseFloat(getExpensesTransactionsInfoById(expensesId, 'total')) ? parseFloat(getExpensesTransactionsInfoById(expensesId, 'total')) : parseFloat(data.liabilities.balance);
            let newLiabilities = {
              mode: 'return',
              name: 'Dev/Crédito',
              total: parseFloat(amount),
              creditId: data.liabilities.id,
              pmId: pmId,
            }

            result = {
              success: true,
              pm: newLiabilities,
            }
          } else{
            result = {
              success: false,
            }
          }
          return null;
        });
      } else{
        result = {
          success: false,
        }
      }
      
      return result;
    }

    const expensesTransactionsDb = {
      expensesTransactions,
      getExpensesTransactionCreditInfo,
      getExpensesTransactionsData,
    }

/**
 * Status and Actions on Payment Method
 *
 * 
 */

    const onFetchingPm = () => dispatch({
      type: actionTypes.onFetchingPm,
    });

    const getPmData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.pm,
            payload: newData,
          });
          saveItem('GS_PM_V1', newData.data.pm);
          saveItem('GS_PM_DATE_V1', newData.data.date);
          saveItem('GS_PM_COUNT_V1', newData.data.count);
        }
      }
    } 

    const pmReady = () => {
      dispatch({
        type: actionTypes.pmReady,
      });
    }

    const onPm = (newData) => {
      getPmData(newData);
      pmReady();
    }

    const resetPmData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          pm: null,
        }
      }
      getPmData(newData);
      onFetchingPm();
    }

    const getPm = () => {
      if(pm.data.pm === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/pm', 
            initCredentials: {
              date: `${pm.data.date}`,
              count: `${pm.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingPm,
            functionSuccess: onPm,
          });
        }
      } else{
        pmReady();
      }
    }

    const pmDb = {
      pm,
    }

/**
 * Status and Actions on Payments
 *
 * 
 */

    const onFetchingPayments = () => dispatch({
      type: actionTypes.onFetchingPayments,
    });

    const getPaymentsData = (newData) => {
      if(isLogin){
        if(currentUser !== null){
          dispatch({
            type: actionTypes.payments,
            payload: newData,
          });
          saveItem('GS_PAYMENTS_V1', newData.data.payments);
          saveItem('GS_PAYMENTS_DATE_V1', newData.data.date);
          saveItem('GS_PAYMENTS_COUNT_V1', newData.data.count);
        }
      }
    } 

    const paymentsReady = () => {
      dispatch({
        type: actionTypes.paymentsReady,
      });
    }

    const onPayments = (newData) => {
      getPaymentsData(newData);
      paymentsReady();
    }

    const resetPaymentsData = () => {
      const newData = {
        data:{ 
          date: '0000-00-00 00:00:00',
          count: 0,
          payments: null,
        }
      }
      getPaymentsData(newData);
      onFetchingPayments();
    }

    const getPayments = () => {
      if(payments.data.payments === null){
        if(currentUser !== null){
          gafpriFetch({
            initMethod: 'POST', 
            initApi: source.api, 
            initRoute: 'gafpriadmin/v1/payments', 
            initCredentials: {
              date: `${payments.data.date}`,
              count: `${payments.data.count}`
            },
            initToken: currentUser, 
            functionFetching: onFetchingPayments,
            functionSuccess: onPayments,
          });
        }
      } else{
        paymentsReady();
      }
    }

    function getPaymentInfoById(paymentId, key){
      let value = null;
      payments.data.payments.map((payment) => {
        if(`${payment.id}` === `${paymentId}`){
          value = payment[key]; 
        }
        return null;
      })
      return value;
    }

    const paymentsDb = {
      payments,
      getPaymentInfoById,
    }



/**
 * Export Status and Actions
 *
 * 
 */

  const states = {
    source,

    whiteLogo,
    MainLogo,

    isLogin,
    currentUser,

    isFetching,
    isError,
    error,

    users,
    usersDb,
    usersIsReady,

    products,
    productsIsReady,

    orders,
    ordersDb,
    ordersIsReady,

    budgets,
    budgetsIsReady,

    creditsDb,
    creditsIsReady,

    accountingDb,
    accountingIsReady,

    purchasesDb,
    purchasesIsReady,

    liabilitiesDB,
    liabilitiesIsReady,

    crDB,
    crIsReady,
    crTransactionIsReady,
    crCheckIsReady,
    crCashIsReady,

    bankTransactionsDb,
    bankTransactionsIsReady,

    expensesTransactionsDb,
    expensesTransactionsIsReady,

    pmDb,
    pmIsReady,

    paymentsDb,
    paymentsIsReady,
  }

  const actions = {
    login,
    writeUsername,
    writePassword,
    onLogOut,
    getOrdersData,
  }

  return {
    states,
    actions,
  };
}

const initialState = () => ({
  source:{
    api: "https://prueba.tiendasgafpri.com/wp-json",
    url:  "https://prueba.tiendasgafpri.com",
  },
  isLogin: false,
  isFetching: false,
  isError: false,
  error: null,
  whiteLogo: LogoWhite,
  MainLogo: LogoMain,
  currentUser: getItem('GS_CURRENT_USER_V1', null),
  username: null,
  password: null,
  users:{
    data:{ 
      date: getItem('GS_USERS_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_USERS_COUNT_V1', 0),
      users: getItem('GS_USERS_V1', null),
    }
  },
  usersIsReady: false,
  products: {
    data:{ 
      date: getItem('GS_PRODUCTS_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_PRODUCTS_COUNT_V1', 0),
      products: getItem('GS_PRODUCTS_V1', null),
    }
  },
  productsIsReady: false,
  orders: {
    data:{ 
      date: getItem('GS_ORDERS_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_ORDERS_COUNT_V1', 0),
      orders: getItem('GS_ORDERS_V1', null),
    }
  },
  ordersIsReady: false,
  budgets: {
    data:{ 
      date: getItem('GS_BUDGETS_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_BUDGETS_COUNT_V1', 0),
      budgets: getItem('GS_BUDGETS_V1', null),
    }
  },
  budgetsIsReady: false,
  credits: {
    data:{ 
      date: getItem('GS_CREDITS_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_CREDITS_COUNT_V1', 0),
      credits: getItem('GS_CREDITS_V1', null),
    }
  },
  creditsIsReady: false,
  accounting: {
    banks: getItem('GS_BANKS_V1', null),
    project: getItem('GS_PROJECT_V1', null),
    expenses: getItem('GS_EXPENSES_V1', null),
  },
  accountingIsReady: false,
  purchases: {
    data:{ 
      date: getItem('GS_PURCHASES_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_PURCHASES_COUNT_V1', 0),
      purchases: getItem('GS_PURCHASES_V1', null),
      tdc: getItem('GS_TDC_V1', null),
    }
  },
  purchasesIsReady: false,
  liabilities: {
    data:{ 
      date: getItem('GS_LIABILITIES_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_LIABILITIES_COUNT_V1', 0),
      liabilities: getItem('GS_LIABILITIES_V1', null),
    }
  },
  liabilitiesIsReady: false,
  cr: {
    data:{ 
      date: getItem('GS_CR_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_CR_COUNT_V1', 0),
      cr: getItem('GS_CR_V1', null),
    }
  },
  crIsReady: false,
  crTransaction: {
    data:{ 
      date: getItem('GS_CR_TRANSACTION_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_CR_TRANSACTION_COUNT_V1', 0),
      crTransaction: getItem('GS_CR_TRANSACTION_V1', null),
    }
  },
  crTransactionIsReady: false,
  crCheck: {
    data:{ 
      date: getItem('GS_CR_CHECK_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_CR_CHECK_COUNT_V1', 0),
      crCheck: getItem('GS_CR_CHECK_V1', null),
    }
  },
  crCheckIsReady: false,
  crCash: {
    data:{ 
      date: getItem('GS_CR_CASH_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_CR_CASH_COUNT_V1', 0),
      crCash: getItem('GS_CR_CASH_V1', null),
    }
  },
  crCashIsReady: false,
  bankTransactions:{
    data:{ 
      date: getItem('GS_BANK_TRANSACTIONS_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_BANK_TRANSACTIONS_COUNT_V1', 0),
      bankTransactions: getItem('GS_BANK_TRANSACTIONS_V1', null),
    }
  },
  bankTransactionsIsReady: false,
  expensesTransactions:{
    data:{ 
      date: getItem('GS_EXPENSES_TRANSACTIONS_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_EXPENSES_TRANSACTIONS_COUNT_V1', 0),
      expensesTransactions: getItem('GS_EXPENSES_TRANSACTIONS_V1', null),
    }
  },
  expensesTransactionsIsReady: false,
  pm:{
    data:{ 
      date: getItem('GS_PM_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_PM_COUNT_V1', 0),
      pm: getItem('GS_PM_V1', null),
    }
  },
  pmIsReady: false,
  payments:{
    data:{ 
      date: getItem('GS_PAYMENTS_DATE_V1', '0000-00-00 00:00:00'),
      count: getItem('GS_PAYMENTS_COUNT_V1', 0),
      payments: getItem('GS_PAYMENTS_V1', null),
    }
  },
  paymentsIsReady: false,
});

const actionTypes = {
  fetching: 'FETCHING',
  login: 'LOGIN',
  error: 'ERROR',
  writeUsername: 'WRITE_USERNAME',
  writePassword: 'WRITE_PASSWORD',
  verifyLogin: 'VERIFY_LOGIN',
  logOut: 'LOG_OUT',
  users: 'USERS',
  usersReady: 'USERS_READY',
  onFetchingUsers: 'FETCHING_USERS',
  products: 'PRODUCTS',
  onFetchingProducts: 'FETCHING_PRODUCTS',
  productsReady: 'PRODUCTS_READY',
  onFetchingOrders: 'FETCHING_ORDERS',
  orders: 'ORDERS',
  ordersReady: 'ORDERS_READY',
  onFetchingBudgets: 'FETCHING_BUDGETS',
  budgets: 'BUDGETS',
  budgetsReady: 'BUDGETS_READY',
  onFetchingCredits: 'FETCHING_CREDITS',
  credits: 'CREDITS',
  creditsReady: 'CREDITS_READY',
  onFetchingAccounting: 'FETCHING_ACCOUNTING',
  accounting: 'ACCOUNTING',
  accountingReady: 'ACCOUNTING_READY',
  onFetchingPurchases: 'FETCHING_PURCHASES',
  purchases: 'PURCHASES',
  purchasesReady: 'PURCHASES_READY',
  onFetchingLiabilities: 'FETCHING_LIABIALITIES',
  liabilities: 'LIABILITIES',
  liabilitiesReady: 'LIABILITIES_READY',
  onFetchingCr: 'FETCHING_CR',
  cr: 'CR',
  crReady: 'CR_READY',
  onFetchingCrTransaction: 'FETCHING_CR_TRANSACTION',
  crTransaction: 'CR_TRANSACTION',
  crTransactionReady: 'CR_TRANSACTION_READY',
  onFetchingCrCheck: 'FETCHING_CR_CHECK',
  crCheck: 'CR_CHECK',
  crCheckReady: 'CR_CHECK_READY',
  onFetchingCrCash: 'FETCHING_CR_CASH',
  crCash: 'CR_CASH',
  crCashReady: 'CR_CASH_READY',
  onFetchingBankTransactions: 'FETCHING_BANK_TRANSACTIONS',
  bankTransactions: 'BANK_TRANSACTIONS',
  bankTransactionsReady: 'BANK_TRANSACTIONS_READY',
  onFetchingExpensesTransactions: 'FETCHING_EXPENSES_TRANSACTIONS',
  expensesTransactions: 'EXPENSES_TRANSACTIONS',
  expensesTransactionsReady: 'EXPENSES_TRANSACTIONS_READY',
  onFetchingPm: 'FETCHING_PM',
  pm: 'PM',
  pmReady: 'PM_READY',
  onFetchingPayments: 'FETCHING_PAYMENTS',
  payments: 'PAYMENTS',
  paymentsReady: 'PAYMENTS_READY',
};

const reducerObject = (state, payload) => ({
  [actionTypes.fetching]: {
    ...state,
    isFetching: true,
  },
  [actionTypes.login]: {
    ...state,
    currentUser: payload,
    isLogin: true,
    isFetching: false,
  },
  [actionTypes.error]: {
    ...state,
    error: payload,
    isLogin: false,
    isFetching: false,
    isError: true,
  },
  [actionTypes.writeUsername]: {
    ...state,
    username: payload,
  },
  [actionTypes.writePassword]: {
    ...state,
    password: payload,
  },
  [actionTypes.verifyLogin]: {
    ...state,
    isLogin: true,
    isFetching: false,
  },
  [actionTypes.logOut]: {
    ...state,
    currentUser: null,
    isLogin: false,
    isFetching: false,
  },
  [actionTypes.users]: {
    ...state,
    users: payload,
  },
  [actionTypes.usersReady]: {
    ...state,
    usersIsReady: true,
  },
  [actionTypes.onFetchingUsers]: {
    ...state,
    usersIsReady: false,
  },
  [actionTypes.products]: {
    ...state,
    products: payload,
  },
  [actionTypes.onFetchingProducts]: {
    ...state,
    productsIsReady: false,
  },
  [actionTypes.productsReady]: {
    ...state,
    productsIsReady: true,
  },
  [actionTypes.onFetchingOrders]: {
    ...state,
    ordersIsReady: false,
  },
  [actionTypes.orders]: {
    ...state,
    orders: payload,
  },
  [actionTypes.ordersReady]: {
    ...state,
    ordersIsReady: true,
  },
  [actionTypes.onFetchingBudgets]: {
    ...state,
    budgetsIsReady: false,
  },
  [actionTypes.budgets]: {
    ...state,
    budgets: payload,
  },
  [actionTypes.budgetsReady]: {
    ...state,
    budgetsIsReady: true,
  },
  [actionTypes.onFetchingCredits]: {
    ...state,
    creditsIsReady: false,
  },
  [actionTypes.credits]: {
    ...state,
    credits: payload,
  },
  [actionTypes.creditsReady]: {
    ...state,
    creditsIsReady: true,
  },
  [actionTypes.onFetchingAccounting]: {
    ...state,
    accountingIsReady: false,
  },
  [actionTypes.accounting]: {
    ...state,
    accounting: payload,
  },
  [actionTypes.accountingReady]: {
    ...state,
    accountingIsReady: true,
  },
  [actionTypes.onFetchingPurchases]: {
    ...state,
    purchasesIsReady: false,
  },
  [actionTypes.purchases]: {
    ...state,
    purchases: payload,
  },
  [actionTypes.purchasesReady]: {
    ...state,
    purchasesIsReady: true,
  },
  [actionTypes.onFetchingLiabilities]: {
    ...state,
    liabilitiesIsReady: false,
  },
  [actionTypes.liabilities]: {
    ...state,
    liabilities: payload,
  },
  [actionTypes.liabilitiesReady]: {
    ...state,
    liabilitiesIsReady: true,
  },
  [actionTypes.onFetchingCr]: {
    ...state,
    crIsReady: false,
  },
  [actionTypes.cr]: {
    ...state,
    cr: payload,
  },
  [actionTypes.crReady]: {
    ...state,
    crIsReady: true,
  },
  [actionTypes.onFetchingCrTransaction]: {
    ...state,
    crTransactionIsReady: false,
  },
  [actionTypes.crTransaction]: {
    ...state,
    crTransaction: payload,
  },
  [actionTypes.crTransactionReady]: {
    ...state,
    crTransactionIsReady: true,
  },
  [actionTypes.onFetchingCrCheck]: {
    ...state,
    crCheckIsReady: false,
  },
  [actionTypes.crCheck]: {
    ...state,
    crCheck: payload,
  },
  [actionTypes.crCheckReady]: {
    ...state,
    crCheckIsReady: true,
  },
  [actionTypes.onFetchingCrCash]: {
    ...state,
    crCashIsReady: false,
  },
  [actionTypes.crCash]: {
    ...state,
    crCash: payload,
  },
  [actionTypes.crCashReady]: {
    ...state,
    crCashIsReady: true,
  },
  [actionTypes.onFetchingBankTransactions]: {
    ...state,
    bankTransactionsIsReady: false,
  },
  [actionTypes.bankTransactions]: {
    ...state,
    bankTransactions: payload,
  },
  [actionTypes.bankTransactionsReady]: {
    ...state,
    bankTransactionsIsReady: true,
  },
  [actionTypes.onFetchingExpensesTransactions]: {
    ...state,
    expensesTransactionsIsReady: false,
  },
  [actionTypes.expensesTransactions]: {
    ...state,
    expensesTransactions: payload,
  },
  [actionTypes.expensesTransactionsReady]: {
    ...state,
    expensesTransactionsIsReady: true,
  },
  [actionTypes.onFetchingPm]: {
    ...state,
    pmIsReady: false,
  },
  [actionTypes.pm]: {
    ...state,
    pm: payload,
  },
  [actionTypes.pmReady]: {
    ...state,
    pmIsReady: true,
  },
  [actionTypes.onFetchingPayments]: {
    ...state,
    paymentsIsReady: false,
  },
  [actionTypes.payments]: {
    ...state,
    payments: payload,
  },
  [actionTypes.paymentsReady]: {
    ...state,
    paymentsIsReady: true,
  },

  

  
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useGafpriAdmin };