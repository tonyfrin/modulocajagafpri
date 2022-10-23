import { getItem } from "./localStorage";

function gafpriFetch({initMethod, initApi, initRoute, initToken, initCredentials, functionFetching, functionSuccess, functionError, onLive, updateLive}) {
  
      if(functionFetching !== undefined){
        functionFetching();
      }


      let headers;
      if(initToken !== undefined){
        headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${initToken.token}`,
        }
      } else{
        headers = {
          "Content-Type": "application/json"
        }
      }

      const options = {
        method: initMethod,
        headers: headers,
        body: JSON.stringify(initCredentials)
      };

      fetch(`${initApi}/${initRoute}`, options)
        .then(response => response.json())
        .then(data => {
          if(onLive === undefined){
            if(data.success){
              if(functionSuccess !== undefined){
                functionSuccess(data);
              }
            } else{
              if(functionError !== undefined){
                functionError(data);
              }
            }
          }else{
            const newCurrentUser = getItem('GS_CURRENT_USER_V1', null);
            if(newCurrentUser !== null){
              if(data.success){
                if(functionSuccess !== undefined){
                  functionSuccess(data);
                }
              } else{
                if(functionError !== undefined){
                  functionError(data);
                }
              }
            } else{
              if(functionError !== undefined){
                functionError(data);
              }
            }
            const newData = {
              users: {
                date: `${getItem(updateLive.users.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.users.liveCount, 0)}`
              },
              products: {
                date: `${getItem(updateLive.products.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.products.liveCount, 0)}`
              },
              orders: {
                date: `${getItem(updateLive.orders.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.orders.liveCount, 0)}`
              },
              budgets: {
                date: `${getItem(updateLive.budgets.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.budgets.liveCount, 0)}`
              },
              credits: {
                date: `${getItem(updateLive.credits.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.credits.liveCount, 0)}`
              },
              purchases: {
                date: `${getItem(updateLive.purchases.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.purchases.liveCount, 0)}`
              },
              liabilities: {
                date: `${getItem(updateLive.liabilities.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.liabilities.liveCount, 0)}`
              },
              cr: {
                date: `${getItem(updateLive.cr.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.cr.liveCount, 0)}`
              },
              crTransaction: {
                date: `${getItem(updateLive.crTransaction.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.crTransaction.liveCount, 0)}`
              },
              crCheck: {
                date: `${getItem(updateLive.crCheck.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.crCheck.liveCount, 0)}`
              },
              crCash: {
                date: `${getItem(updateLive.crCash.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.crCash.liveCount, 0)}`
              },
              bankTransactions: {
                date: `${getItem(updateLive.bankTransactions.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.bankTransactions.liveCount, 0)}`
              },
              expensesTransactions: {
                date: `${getItem(updateLive.expensesTransactions.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.expensesTransactions.liveCount, 0)}`
              },
              pm: {
                date: `${getItem(updateLive.pm.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.pm.liveCount, 0)}`
              },
              payments: {
                date: `${getItem(updateLive.payments.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.payments.liveCount, 0)}`
              }
            };
            setTimeout(onLive, 1000, newData, newCurrentUser);
          }
        })
        .catch((error) => {
          if(functionError !== undefined){
            functionError(error);
          }
          if(onLive !== undefined){
            const newCurrentUser = getItem('GS_CURRENT_USER_V1', null);
            const newData = {
              users: {
                date: `${getItem(updateLive.users.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.users.liveCount, 0)}`
              },
              products: {
                date: `${getItem(updateLive.products.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.products.liveCount, 0)}`
              },
              orders: {
                date: `${getItem(updateLive.orders.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.orders.liveCount, 0)}`
              },
              budgets: {
                date: `${getItem(updateLive.budgets.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.budgets.liveCount, 0)}`
              },
              credits: {
                date: `${getItem(updateLive.credits.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.credits.liveCount, 0)}`
              },
              purchases: {
                date: `${getItem(updateLive.purchases.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.purchases.liveCount, 0)}`
              },
              liabilities: {
                date: `${getItem(updateLive.liabilities.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.liabilities.liveCount, 0)}`
              },
              cr: {
                date: `${getItem(updateLive.cr.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.cr.liveCount, 0)}`
              },
              crTransaction: {
                date: `${getItem(updateLive.crTransaction.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.crTransaction.liveCount, 0)}`
              },
              crCheck: {
                date: `${getItem(updateLive.crCheck.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.crCheck.liveCount, 0)}`
              },
              crCash: {
                date: `${getItem(updateLive.crCash.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.crCash.liveCount, 0)}`
              },
              bankTransactions: {
                date: `${getItem(updateLive.bankTransactions.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.bankTransactions.liveCount, 0)}`
              },
              expensesTransactions: {
                date: `${getItem(updateLive.expensesTransactions.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.expensesTransactions.liveCount, 0)}`
              },
              pm: {
                date: `${getItem(updateLive.pm.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.pm.liveCount, 0)}`
              },
              payments: {
                date: `${getItem(updateLive.payments.liveDate, '0000-00-00 00:00:00')}`,
                count: `${getItem(updateLive.payments.liveCount, 0)}`
              }
            };
            setTimeout(onLive, 1000, newData, newCurrentUser);
          }
      });
}

export { gafpriFetch };
