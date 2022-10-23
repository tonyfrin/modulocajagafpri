import React from 'react';
import { Title1, Title2 } from '../Title/Title';
import { Button3, Button4 } from '../Button/Button';
import { Input1 } from '../Input';
import { gsThousandsFormat } from '../Helpers/helpers';

const Form1 = (propos) => (
    <>
        <form className='gs-box-form-1'>
                <Title1 title={propos.title} />
                <Title2 title={propos.SubTitle}/>
            <div className='gs-row'>
                <div className='gs-col-11 gs-col-input-form-1'>
                    <Input1 
                        GsType={propos.typeInputUp}
                        GsFunction={propos.FunctionInputUp}
                        GsPlaceholder={propos.PlaceInputUp} 
                        autoComplete={propos.autoCompleteInputUp}
                    />
                </div>
            </div>
            <div className='gs-row'>
                <div className='gs-col-11 gs-col-input-form-1'>
                    <Input1 
                        GsType={propos.typeInputDown} 
                        GsFunction={propos.FunctionInputDown} 
                        GsPlaceholder={propos.PlaceInputDown} 
                        autoComplete={propos.autoCompleteInputDown}
                    />
                </div>
            </div> 
            {
                propos.thirdInput ? 
                <div className='gs-row'>
                    <div className='gs-col-11 gs-col-input-form-1'>
                        <Input1 
                            GsType={propos.typeInputThird} 
                            GsFunction={propos.FunctionInputThird} 
                            GsPlaceholder={propos.PlaceInputThird} 
                            autoComplete={propos.autoCompleteInputThird}
                        />
                    </div>
                </div>  : ''
            }
            {
                propos.GsButton ? 
                <div className='gs-row gs-row-buttons-form-1'>
                    <Button3 key='button-1'
                    Title={propos.ButtonTitle}
                    Function={propos.ButtonFunction}
                    color={propos.GsColor}
                    />
                </div> : ''
            }
        </form>
    </>
)

const FormUserHeader = (propos) => (
    <>
        <div className='gs-col-6 gs-col-user-header'>
            <div className='gs-row gs-row-info-user'>
                <div className='gs-col-4 gs-col-title-info-user'>
                    <h4 className='gs-title-info-user'>Nombre:</h4>
                </div>
                <div className='gs-col-6 gs-col-info-user'>
                    <span className='gs-info-user'>{propos.userName}</span>
                </div>
                <div className='gs-col-2 gs-col-button-info-user'>
                    <Button4
                    Title={propos.buttonReturn || 'Cambiar'}
                    Function={propos.FunctionReturn}
                    color='#c12429'
                    />
                </div>
            </div>
            <div className='gs-row gs-row-info-user'>
                <div className='gs-col-4 gs-col-title-info-user'>
                    <h4 className='gs-title-info-user'>Dirección:</h4>
                </div>
                <div className='gs-col-8 gs-col-info-user'>
                    <span className='gs-info-user'>{propos.userAddress}</span>
                </div>
            </div>
            <div className='gs-row gs-row-info-user'>
                <div className='gs-col-4 gs-col-title-info-user'>
                    <h4 className='gs-title-info-user'>Email:</h4>
                </div>
                <div className='gs-col-8 gs-col-info-user'>
                    <span className='gs-info-user'>{propos.userEmail}</span>
                </div>
            </div>
            <div className='gs-row gs-row-info-user'>
                <div className='gs-col-4 gs-col-title-info-user'>
                    <h4 className='gs-title-info-user'>Teléfono:</h4>
                </div>
                <div className='gs-col-8 gs-col-info-user'>
                    <span className='gs-info-user'>{propos.userPhone}</span>
                </div>
            </div>
        </div> 
    </>
)

const FormOrdersHeader = (propos) => (
    <>
        <div className='gs-col-6 gs-col-orders-header'>
            <div className='gs-row gs-row-info-orders'>
                <div className='gs-col-12 gs-row'>
                    <h3>{propos.Title}</h3>
                    {propos.orderId !== undefined ?
                        <h3 className='title-orders-header'># {propos.orderId}</h3> :
                        ''
                    }
                </div>
            </div>
            <div className='gs-row gs-row-info-orders'>
                <div className='gs-col-4 gs-col-title-info-orders'>
                    <h4 className='gs-title-info-orders'>Total:</h4>
                </div>
                <div className='gs-col-8 gs-col-title-info-orders'>
                    <span className='gs-info-orders'>{propos.CurrencySymbol}</span><span className='gs-info-orders'>{propos.Total.toFixed(2)}</span>
                </div>
            </div>
            {propos.Total > 0 ?
                <div className='gs-row gs-row-info-orders'>
                    <div className='gs-col-12 gs-button-add'>
                        <Button3 
                            Title={propos.buttonTitle || 'Agregar'}
                            color='#07b2e7'
                            Function={propos.OrderFunction}
                        />
                    </div>
                </div>: 
            ''}
        </div> 
    </>
)

const FormOrdersHeaderView = (propos) => {
    const status = propos.status;
    let nameStatus = '';
    let colorStatus = '';
    if(status === 'gs-draft'){
        nameStatus = 'Borrador';
        colorStatus = '#afb3b9';
    } else if(status === 'gs-on-hold'){
        nameStatus = 'En Espera';
        colorStatus = '#f8dda7';
    } else if(status === 'gs-cancelled'){
        nameStatus = 'Cancelado';
        colorStatus = '#c12429';
    } else if(status === 'gs-completed'){
        nameStatus = 'Completado';
        colorStatus = '#439b57';
    }

    return(
    <>
        <div className='gs-col-6 gs-col-orders-header'>
            <div className='gs-row gs-row-info-orders'>
                <div className='gs-col-12 gs-row'>
                    <h3>{propos.Title}</h3>
                    {propos.orderId !== undefined ?
                        <h3 className='title-orders-header'># {propos.orderId}</h3> :
                        ''
                    }
                </div>
            </div>
            <div className='gs-row gs-row-info-orders'>
                <div className='gs-col-4 gs-col-title-info-orders'>
                    <h4 className='gs-title-info-orders'>Total:</h4>
                </div>
                <div className='gs-col-8 gs-col-title-info-orders'>
                    <span className='gs-info-orders'>{propos.CurrencySymbol}</span><span className='gs-info-orders'>{gsThousandsFormat(propos.Total)}</span>
                </div>
            </div>
            <div className='gs-row gs-row-info-orders'>
                <div className='gs-col-4 gs-col-title-info-orders'>
                    <h4 className='gs-title-info-orders'>Estatus:</h4>
                </div>
                <div className='gs-col-8 gs-col-title-info-orders'>
                    <span className='gs-info-orders'>
                        <Button4
                            Title={nameStatus}
                            color={colorStatus}
                        />    
                    </span>
                </div>
            </div>
            <div className='gs-row gs-row-info-orders'>
                <div className='gs-col-4 gs-col-title-info-orders'>
                    <h4 className='gs-title-info-orders'>Metodo de Pago:</h4>
                </div>
                <div className='gs-col-8 gs-col-title-info-orders'>
                    <span className='gs-info-orders'>{propos.paymentMethod}</span>
                </div>
            </div>
            
        </div> 
    </>
)}

const FormDespachoHeader = (propos) => (
    <>
        <div className='gs-col-12 gs-col-despacho-header'>
            <div className='gs-row gs-row-info-despacho'>
                <div className='gs-col-4 gs-col-title-info-despacho'>
                    <h4 className='gs-title-info-despacho'>Pedido:</h4>
                </div>
                <div className='gs-col-6 gs-col-info-despacho'>
                    <span className='gs-info-despacho'>{propos.orderId}</span>
                </div>
                <div className='gs-col-2 gs-col-button-info-despacho'>
                    <Button4
                    Title='Volver'
                    Function={propos.FunctionReturn}
                    color='#c12429'
                    />
                </div>
            </div>
            <div className='gs-row gs-row-info-despacho'>
                <div className='gs-col-4 gs-col-title-info-despacho'>
                    <h4 className='gs-title-info-despacho'>Cliente:</h4>
                </div>
                <div className='gs-col-8 gs-col-info-despacho'>
                    <span className='gs-info-despacho'>{propos.userName}</span>
                </div>
            </div>
            <div className='gs-row gs-row-info-despacho'>
                <div className='gs-col-4 gs-col-title-info-despacho'>
                    <h4 className='gs-title-info-despacho'>Fecha:</h4>
                </div>
                <div className='gs-col-8 gs-col-info-despacho'>
                    <span className='gs-info-despacho'>{propos.orderDate}</span>
                </div>
            </div>
        </div> 
    </>
)

const Form2 = (propos) => (
    <>
        <div className='gs-col-6 gs-col-user-header'>
            {propos.items && 
                propos.items.map((item) =>(
                    <div className='gs-row gs-row-info-despacho'>
                        <div className='gs-col-4 gs-col-title-info-despacho'>
                            <h4 className='gs-title-info-despacho'>{item.title}:</h4>
                        </div>
                        <div className='gs-col-6 gs-col-info-despacho'>
                            <span className='gs-info-despacho'>{item.value}</span>
                        </div>
                    </div>
                ))
            }
        </div> 
    </>
)

const Form3 = (propos) => {

    return (
    <>
        <div className='gs-col-6 gs-col-container-form-3'>
            <Title2 title={propos.SubTitle}/>
            <div className='gs-col-12 gs-col-form-3'>
                {
                    Object.entries(propos.items).map(([key, value]) =>{
                        if(value.items.length > 0){
                            if(key === 'credit'){
                                if(propos.countCredits === 0){
                                    return (
                                        <span className='container-botton-form-3' key={key}>
                                            <Button4
                                                Title={value.name}
                                                Function={() => propos.function(value.name)}
                                                color='#324375'
                                            />
                                        </span>
                                    );
                                }else{
                                    return null;
                                }
                            } else{
                                return (
                                    <span className='container-botton-form-3' key={key}>
                                        <Button4
                                            Title={value.name}
                                            Function={() => propos.function(value.name)}
                                            color='#324375'
                                        />
                                    </span>
                                );
                            } 
                        } else{
                            return null;
                        }
                    })
                }
            </div> 
        </div>
    </>
)}

const Form4 = ({ children }) => (
    <>
        <form className='gs-box-form-1'>
            {children}
        </form>
    </>
)


export {Form1, FormUserHeader, FormOrdersHeader, FormDespachoHeader, Form2, Form3, Form4, FormOrdersHeaderView};