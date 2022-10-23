import React from "react";
import { FormUserHeader, FormOrdersHeader } from "../abstracts/Form";
import { Title1, Title2 } from "../abstracts/Title/Title";
import { Tienda } from "../abstracts/constants/Tienda";
import { Cart } from "../abstracts/Cart"


const UpdateSalesModule = ({ GsTitle, GsSubTitle, mainState, mainActions, functionReturn, orderId}) => {


    return(
        <>
            <div className="main-header-sales-module-2">
                <Title1 title={GsTitle} />
                <Title2 title='Actualizar Pedido'/>
                <div className="gs-row gs-row-header-sales-module">
                        <FormUserHeader 
                        userName={mainState.user.name}
                        userAddress={mainState.user.address}
                        userEmail={mainState.user.email}
                        userPhone={mainState.user.phone}
                        FunctionReturn={functionReturn}
                        buttonReturn='Volver'
                        />
                        <FormOrdersHeader 
                            Title={GsSubTitle}
                            CurrencySymbol={Tienda.currencySymbol}
                            Total={mainState.cartTotal}
                            OrderFunction={mainActions.updateOrderDb}
                            buttonTitle='Actualizar'
                            orderId={orderId}
                        />
                </div>
           </div>
           <Cart 
                mainState={mainState}
                mainActions={mainActions}
           />
        </>
    )

}

export { UpdateSalesModule };