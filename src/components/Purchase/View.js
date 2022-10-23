import React from 'react';
import { Title1, Title2 } from '../abstracts/Title/Title';
import { FormUserHeader, FormOrdersHeaderView } from '../abstracts/Form';
import { Tienda } from '../abstracts/constants/Tienda';
import { CartView } from '../abstracts/Cart';

function View({purchases, users, mainActions }) {
    const id = purchases.id;
    const user = users.getUserById(purchases.userId);
    const total = purchases.total;
    const status = purchases.status;
    const paymentMethod = purchases.paymentMethod;
    const cartItems = purchases.products;




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
                            FunctionReturn={mainActions.onExpenses}
                            buttonReturn='Volver'
                        />
                        <FormOrdersHeaderView 
                            Title='Detalles de la Compra'
                            CurrencySymbol={Tienda.currencySymbol}
                            Total={total}
                            orderId={id}
                            status={status}
                            paymentMethod={paymentMethod}
                        />
                </div>
           </div>
            <CartView 
                    cartItems={cartItems}
            />
        </>
    )
}

export {View};
