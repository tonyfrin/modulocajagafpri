import React from "react";
import { useGafpriUpdateSales } from "./useGafpriUpdateSales";
import Loading from "../loading";
import { Button4 } from "../abstracts/Button/Button";
import { Table2 } from "../abstracts/Table";
import { UpdateSalesModule } from "./UpdateSalesModule";

const UpdateSales = ({users, products, orders, currentUser, source, title, apiRoute, buttonReturn, functionReturn, userId, orderId, purchase}) => {
    const {
        states,
        actions,
    } = useGafpriUpdateSales({users, products, orders, currentUser, source, apiRoute, userId, orderId, functionReturn, purchase});
 
    function header () {
        return(
            <>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Costo</th>
                    <th>Precio</th>
                    <th>Acción</th>
                </tr>
            </>
        )
    }

    function Items({items}) {
        return (
        <>
            {items &&
            items.map((product) => (
                <tr key={product.id}>
                        <td className='gs-col-1'>{product.sku}</td>
                        <td className='gs-col-6'>{product.productName}</td>
                        <td className='gs-col-1'>{product.stock}</td>
                        <td className='gs-col-1'>{product.costo.toFixed(2)}</td>
                        <td className='gs-col-1'>{product.price.toFixed(2)}</td>
                        <td className='gs-col-1'>
                            <Button4
                                Title='Seleccionar'
                                color='#07b2e7'
                                Function={() => actions.selectProduct(product.sku)}
                            />
                        </td>
                   
                </tr>
            ))}
        </>
        );
    }

    if(states.isSalesSection){
        return(
            <>
            <main className="gs-container gs-sales-container">
                <UpdateSalesModule 
                    GsTitle={title}
                    GsSubTitle='Información del Pedido'
                    mainState={states}
                    mainActions={actions}
                    functionReturn={functionReturn}
                    buttonReturn={buttonReturn}
                    orderId={orderId}
                />
            </main>
            </>
        )
    } else if(states.isFetching){
        return(
            <>
                <main className="gs-container gs-sales-container">
                    <Loading />
                </main>
            </>
        )
    } else if(states.isProductSelection){
        return(
            <>
                <main className="gs-container gs-sales-container">
                    <Table2
                        Title={title}
                        SubTitle='Seleccionar Producto'
                        PlaceholderSearch='Buscar por Nombre'
                        Items={states.productSearch}
                        FunctionReturn={() => actions.onSalesSection()}
                        TitleButtonReturn='Regresar'
                        FuctionSearch={actions.changeProductName}
                        ItemList = {Items}
                        Header = {header}
                    />
                </main>
            </>
        )
    }
}


                    

export { UpdateSales };