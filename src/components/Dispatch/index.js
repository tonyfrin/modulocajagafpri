import React from "react";
import Loading from "../loading";
import { DespachoModule } from "./DespachoModule";
import { OrderDetails } from "./orderDetails";
import { useGafpriDispatch } from "./useGafpriDispatch";


const Dispatch = ({orders, currentUser, source, mainActions}) => {
    const {
        states,
        actions,
    } = useGafpriDispatch({orders, currentUser, source, mainActions});


    if(states.isInit){
        return(
            <>
                <main className="gs-container gs-main-despacho">
                        <DespachoModule mainState={states} mainActions={actions}/>
                </main>
            </>
        )
    } else if(states.isFetching){
        return(
            <>
                <main className="gs-container gs-main-despacho">
                        <Loading />
                </main>
            </>
        )
    } else if(states.isOrderSelect){
        return(
            <>
                <main className="gs-container gs-main-despacho">
                        <OrderDetails mainState={states} mainActions={actions}/>
                </main>
            </>
        )
    }

}

export { Dispatch };