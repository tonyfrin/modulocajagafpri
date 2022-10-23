import React from "react";
import './App.css';
import Home from "../components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { MainHeader, LoginHeader, AdminHeader } from "../components/Header/Header";
import MainFooter from "../components/Footer";
import Login from "../components/Login";
import Loading from "../components/loading";
import { useGafpriAdmin } from "./useGafpriAdmin";
import { Sales } from "../components/Sales";
import { Budget } from "../components/Budget";
import { Dispatch } from "../components/Dispatch";
import { Payments } from "../components/Payments";
import { Bank } from "../components/Bank";
import { Purchase } from "../components/Purchase";
import CashRegister from "../components/CashRegister";
import { ExpensesModule } from "../components/Expenses";



function App() {
  const {
    states,
    actions,
  } = useGafpriAdmin();

  const isLogin = states.isLogin;
  const isFetching = states.isFetching;
  const userIsReady = states.usersIsReady;
  const productsIsReady = states.productsIsReady;
  const ordersIsReady = states.ordersIsReady;
  const budgetsIsReady = states.budgetsIsReady;
  const creditsIsReady = states.creditsIsReady;
  const accountingIsReady = states.accountingIsReady;
  const purchasesIsReady = states.purchasesIsReady;
  const liabilitiesIsReady = states.liabilitiesIsReady;
  const crIsReady = states.crIsReady;
  const crTransactionIsReady = states.crTransactionIsReady;
  const crCheckIsReady = states.crCheckIsReady;
  const crCashIsReady = states.crCashIsReady;
  const bankTransactionsIsReady = states.bankTransactionsIsReady;
  const expensesTransactionsIsReady = states.expensesTransactionsIsReady;
  const pmIsReady = states.pmIsReady;
  const paymentsIsReady = states.paymentsIsReady;

  if(isLogin){
    if(userIsReady && productsIsReady && ordersIsReady && budgetsIsReady && creditsIsReady && accountingIsReady && purchasesIsReady && liabilitiesIsReady && crIsReady && crTransactionIsReady && crCheckIsReady && crCashIsReady && bankTransactionsIsReady && expensesTransactionsIsReady && pmIsReady && paymentsIsReady){
      return (
        <>
          <Router>
            <Routes>
              <Route path="/" element={
                <React.Fragment>
                  <div className='gs-body gs-home-container'>
                    <AdminHeader MainLogo={states.MainLogo}/>
                    {!!isFetching ? 
                        <Loading />
                      :
                        <Home />
                    }
                    <MainFooter 
                      isLogin={isLogin}
                      onLogOut={actions.onLogOut}
                    />
                  </div>
                </React.Fragment>
              } />  
              <Route path="*" element={
                <React.Fragment>    
                  <div className='gs-body gs-ventas-container'>
                      <MainHeader MainLogo={states.MainLogo} onLogOut={actions.onLogOut}/>
                      
                    {!!isFetching ? <Loading />
                      :
                      <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/ventas" element={<Sales users={states.usersDb} products={states.products} currentUser={states.currentUser} source={states.source} apiRoute='gafpriadmin/v1/order/add' title='Modulo de ventas' buttonReturn={false}/>} />
                        <Route exact path="/presupuesto" element={<Budget users={states.usersDb} products={states.products} budgets={states.budgets} currentUser={states.currentUser} source={states.source}/>} />
                        <Route exact path="/despacho" element={<Dispatch orders={states.orders} currentUser={states.currentUser} source={states.source} mainActions={actions}/>} />
                        <Route exact path="/pagos" element={<Payments orders={states.ordersDb} users={states.usersDb} products={states.products} currentUser={states.currentUser} source={states.source} credits={states.creditsDb} accounting={states.accountingDb} purchases={states.purchasesDb} liabilities={states.liabilitiesDB}/>} />
                        <Route exact path="/bancos" element={<Bank accounting={states.accountingDb} source={states.source} currentUser={states.currentUser} users={states.usersDb} cr={states.crDB} bankTransactions={states.bankTransactionsDb}/>} />
                        <Route exact path="/compras" element={<Purchase users={states.usersDb} products={states.products} currentUser={states.currentUser} source={states.source} purchases={states.purchasesDb} accounting={states.accountingDb}/>} />
                        <Route exact path="/caja" element={<CashRegister cr={states.crDB} users={states.usersDb} currentUser={states.currentUser} source={states.source} accounting={states.accountingDb} />} />
                        <Route exact path="/expenses" element={<ExpensesModule  users={states.usersDb} accounting={states.accountingDb} currentUser={states.currentUser} source={states.source} expensesTransactions={states.expensesTransactionsDb}/>} />
                      </Routes>
                    }
                    <MainFooter 
                      isLogin={isLogin}
                      onLogOut={actions.onLogOut}
                    />
                  </div>
                </React.Fragment>
              } />
            </Routes>   
          </Router>
        </>
      );
    } else{
      return (
        <>
          <div className='gs-body gs-home-container'>
            <Router>
              <AdminHeader 
                MainLogo={states.MainLogo}
              />
              <Loading />
              <MainFooter 
              isLogin={isLogin}
              onLogOut={actions.onLogOut}/>
            </Router>
          </div>
        </>
      );
    }
  } else{
    return (
      <>
        <div className='gs-body gs-login-container'>
          <Router>
            <LoginHeader 
              whiteLogo={states.whiteLogo}
            />
            {!!isFetching ? <Loading />
              :
              <Login 
                handleSubmit = {actions.login}
                username={actions.writeUsername}
                password={actions.writePassword}
              />
            }
            <MainFooter isLogin={isLogin}/>
          </Router>
        </div>
      </>
    );
  }

}

export default App;