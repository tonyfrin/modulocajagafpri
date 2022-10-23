import React from "react";
import { useGafpriSales } from "./useGafpriSales";
import { Form1 } from "../abstracts/Form";
import { FormAddUser } from "../abstracts/Form/AddUser/FormAddUser";
import Loading from "../loading";
import { Button4 } from "../abstracts/Button/Button";
import { Table2 } from "../abstracts/Table";
import { SalesModule } from "./SalesModule";

const Sales = ({users, products, currentUser, source, title, apiRoute, buttonReturn, functionReturn}) => {
    const {
        states,
        actions,
    } = useGafpriSales({users, products, currentUser, source, apiRoute});

    function ItemsUsers({items}) {
        return (
        <>
            {items &&
            items.map((user) => (
                <tr key={user.id}>
                   
                        <td className='gs-col-5'>{user.nifType}-{user.nif}</td>
                        <td className='gs-col-5'>{user.name}</td>
                        <td className='gs-col-2'>
                            <Button4
                                Title='Seleccionar'
                                color='#07b2e7'
                                Function={() => actions.userSelect(user)}
                            />
                        </td>
                </tr>
            ))}
        </>
        );
    }

    function headerUsers () {
        return(
            <>
                <tr>
                    <th>R.I.F</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                </tr>
            </>
        )
    }

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

    if(states.isInit){
        return(
            <>
                <main className="gs-container gs-sales-container">
                    <Form1
                        title={title}
                        SubTitle='Buscar Cliente'

                        typeInputUp='number'
                        PlaceInputUp = 'Buscar por Rif o Cédula de identidad'
                        FunctionInputUp={actions.changeUserNif}
                        
                        typeInputDown='text'
                        PlaceInputDown = 'Buscar por Nombre'
                        FunctionInputDown={actions.changeUserName}
            
                        thirdInput={true}
                        typeInputThird='email'
                        PlaceInputThird='Buscar por Email'
                        FunctionInputThird={actions.changeUserEmail}

                        GsButton={buttonReturn}
                        ButtonTitle='Regresar'
                        GsColor='#c12429'
                        ButtonFunction={functionReturn}
                    />
                </main>
            </>
        )
    } else if(states.isUserForm){
        return(
            <>
                <main className="gs-container gs-sales-container">
                    <FormAddUser 
                        title={title}
                        SubTitle='Agregar Cliente'
                        mainState={states}
                        mainActions={actions}
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
    } else if(states.isUserSelection){
        return(
            <>
                <main className="gs-container gs-sales-container">
                    <Table2
                        Title={title}
                        SubTitle='Seleccionar Cliente'
                        PlaceholderSearch='Buscar por Nombre'
                        Items={states.userSearch}
                        TitleButtonReturn='Regresar'
                        FunctionReturn={actions.onInit}
                        FuctionSearch={actions.changeUserName}
                        ItemList = {ItemsUsers}
                        Header = {headerUsers}
                    />
                </main>
            </>
        )
    } else if(states.isSalesSection){
        return(
            <>
            <main className="gs-container gs-sales-container">
                <SalesModule 
                    GsTitle={title}
                    GsSubTitle='Información del Pedido'
                    mainState={states}
                    mainActions={actions}
                />
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


                    

export { Sales };