import React from 'react';
import { Title1, Title2 } from '../abstracts/Title/Title';
import { FormUserHeader, FormOrdersHeader } from '../abstracts/Form';
import { Tienda } from '../abstracts/constants/Tienda';
import { CartReturn } from '../abstracts/Cart';

function Return({purchases, users, mainActions, mainStates}) {
    const id = purchases.id;
    const user = users.getUserById(purchases.userId);
    const total = mainStates.cartTotal;
    const cartItems = purchases.products;

    React.useEffect(() => {
        mainActions.setCartItems(cartItems);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function orderReturn(){
        const newReturn = {
            id: parseInt(id),
            userId: parseInt(user.id),
            total: parseFloat(total.toFixed(2)),
            cartItems: mainStates.cartItems,
        }
        console.log(newReturn);
    }


  return(
        <>
            <div className="main-header-sales-module-2">
                <Title1 title='Modulo de Compra' />
                <Title2 title={`Ver Compra #${id}`}/>
                <div className="gs-row gs-row-header-sales-module">
                        <FormUserHeader 
                            userName={user.name}
                            userAddress={user.address}
                            userEmail={user.email}
                            userPhone={user.phone}
                            FunctionReturn={mainActions.returnOnExpenses}
                            buttonReturn='Volver'
                        />
                        <FormOrdersHeader 
                            Title='Detalles de la Devolución'
                            CurrencySymbol={Tienda.currencySymbol}
                            Total={total}
                            orderId={id}
                            buttonTitle='Devolver'
                            OrderFunction={orderReturn}
                        />
                </div>
           </div>
            <CartReturn 
                    mainState={mainStates}
                    mainActions={mainActions}
            />
        </>
    )
}

export {Return};
