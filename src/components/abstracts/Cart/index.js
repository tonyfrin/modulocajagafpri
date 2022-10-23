import React from 'react';
import { Title2 } from '../Title/Title';
import { TableCart } from '../Table/TableCart';
import { Input1, Input2, Input3 } from '../Input';
import { Button4 } from '../Button/Button';
import { Tienda } from '../constants/Tienda';
import { gsThousandsFormat } from '../Helpers/helpers';

const Cart = ({ mainState, mainActions, update }) => {
    const [CartList, setCartList] = React.useState(0);

    React.useEffect(() => {
        
        setCartList(() =>  (
            <>
                {mainState.cartItems && mainState.cartItems.map((product, index) => (
                    <tr key={`product-${index}`}>
                            <td className='gs-col-1'><span className='gs-td-value'>{product.sku}</span></td>
                            <td className='gs-col-4'><span className='gs-td-value'>{product.productName}</span></td>
                            <td className='gs-col-1'><span className='gs-currency'>{Tienda.currencySymbol}</span><span className='gs-td-value'>{product.costo !== undefined ? product.costo.toFixed(2) : '0.00'}</span></td>
                            <td className='gs-col-1 '>{update ? <Input3 defaultValue={product.quantity.toFixed(2)} GsType='number' min="0.00" GsFunction={(event) => mainActions.updateQuantityItemCart(index, event)}/> : <Input2 defaultValue={product.quantity.toFixed(2)} GsType='number' min="0.00" GsFunction={(event) => mainActions.updateQuantityItemCart(index, event)}/>}</td>
                            <td className='gs-col-2'>{update ? <Input3 defaultValue={product.price.toFixed(2)} GsType='number' min="0.00" GsFunction={(event) => mainActions.updatePriceItemCart(index, event)}/> : <Input2 defaultValue={product.price.toFixed(2)} GsType='number' min="0.00" GsFunction={(event) => mainActions.updatePriceItemCart(index, event)}/>}</td>
                            <td className='gs-col-2'><span className='gs-currency'>{Tienda.currencySymbol}</span><span className='gs-td-value'>{product.total.toFixed(2)}</span></td>
                            <td className='gs-col-1'>
                                <Button4
                                    Title='X'
                                    color='#c12429'
                                    Function={() => mainActions.removeItemCart(index)}
                                />
                            </td>
                    </tr>
                ))}
            </>
        ));

    }, [mainState.cartItems, mainState.cartTotal, mainState.cartTotalItems]); // eslint-disable-line react-hooks/exhaustive-deps  

    return (
        <>
        <div className='gs-main-cart'>
            <div className='gs-row gs-row-title-cart'>
                <Title2
                    title='Carrito'
                />
                <div className='gs-row gs-button-cart'>
                    <Button4 
                        Title='Vaciar Carrito'
                        color='#c12429'
                        Function={() => mainActions.resetCart()}
                    />
                </div>
                <TableCart 
                    CartList={CartList}
                />
            </div>
            <div className='gs-row gs-row-search-cart'>
                <div className='gs-col-4 gs-col-search-cart'>
                    <Input1 
                        GsPlaceholder='Buscar por código'
                        GsType='text'
                        GsFunction={mainActions.changeProductSku}
                    />
                </div>
                <div className='gs-col-4 gs-col-search-cart'>
                    <Input1 
                        GsPlaceholder='Buscar por nombre'
                        GsFunction={mainActions.changeProductName}
                    />
                </div>
            </div>
        </div>
        </>
)}

const CartView = ({cartItems}) => {

    const CartList = cartItems && cartItems.map((product, index) => (
        <tr key={`product-${index}`}>
                <td className='gs-col-2'><span className='gs-td-value'>{product.sku}</span></td>
                <td className='gs-col-4'><span className='gs-td-value'>{product.productName}</span></td>
                <td className='gs-col-2'><span className='gs-currency'>{Tienda.currencySymbol}</span><span className='gs-td-value'>{gsThousandsFormat(product.costo)}</span></td>
                <td className='gs-col-2 '><span className='gs-td-value'>{gsThousandsFormat(product.quantity)}</span></td>
                <td className='gs-col-2'><span className='gs-currency'>{Tienda.currencySymbol}</span><span className='gs-td-value'>{gsThousandsFormat(product.price)}</span></td>
                <td className='gs-col-2'><span className='gs-currency'>{Tienda.currencySymbol}</span><span className='gs-td-value'>{gsThousandsFormat(product.total)}</span></td>
        </tr>
    ))
    
    return (
        <>
            <div className='gs-main-cart'>
                <div className='gs-row gs-row-title-cart'>
                    <Title2
                        title='Carrito'
                    />
                    <TableCart 
                        CartList={CartList}
                    />
                </div>
            </div>
        </>
    )
}

const CartReturn = ({ mainState, mainActions }) => {
    const [CartList, setCartList] = React.useState(0);

    React.useEffect(() => {
        
        setCartList(() =>  (
            <>
                {mainState.cartItems && mainState.cartItems.map((product, index) => (
                    <tr key={`product-${index}`}>
                        <td className='gs-col-1'><span className='gs-td-value'>{product.sku}</span></td>
                        <td className='gs-col-4'><span className='gs-td-value'>{product.productName}</span></td>
                        <td className='gs-col-2'><span className='gs-currency'>{Tienda.currencySymbol}</span><span className='gs-td-value'>{gsThousandsFormat(product.costo)}</span></td>
                        <td className='gs-col-1 '><Input2 defaultValue={product.quantity.toFixed(2)} GsType='number' min="0.00" GsFunction={(event) => mainActions.updateQuantityItemCart(index, event)}/> </td>
                        <td className='gs-col-2'><span className='gs-currency'>{Tienda.currencySymbol}</span><span className='gs-td-value'>{gsThousandsFormat(product.price)}</span></td>
                        <td className='gs-col-2'><span className='gs-currency'>{Tienda.currencySymbol}</span><span className='gs-td-value'>{gsThousandsFormat(product.total)}</span></td>
                    </tr>
                ))}
            </>
        ));

    }, [mainState.cartItems, mainState.cartTotal, mainState.cartTotalItems]); // eslint-disable-line react-hooks/exhaustive-deps  

    return (
        <>
        <div className='gs-main-cart'>
            <div className='gs-row gs-row-title-cart'>
                <Title2
                    title='Carrito'
                />
                <TableCart 
                    CartList={CartList}
                />
            </div>
        </div>
        </>
)}

export { Cart, CartView, CartReturn};