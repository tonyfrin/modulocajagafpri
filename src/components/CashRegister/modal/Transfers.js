import React from "react";
import { Title2 } from "../../abstracts/Title/Title";
import { Input4 } from "../../abstracts/Input";
import { Button3 } from "../../abstracts/Button/Button";
import { Form4 } from "../../abstracts/Form";
import Select from 'react-select';



const Transfers = ({ mainStates, mainActions, closeModal, users, cr}) => {
    const [amount, setAmount] = React.useState(0);
    const [user, setUser] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [change, setChange] = React.useState(0);
    


    function close(){
        closeModal(); 
        setAmount(0);
        setUser(0);
        setCurrency('');
        setChange(0);
    }

    function add(){
        let newChange;
        if(currency === 'usd'){
            newChange = parseFloat(amount);
        } else{
            newChange = parseFloat(change);
        }

        const newTransfer = {
            total: parseFloat(amount),
            currency: currency,
            change: newChange,
            userId: user
        }
        mainActions.addTransfer(newTransfer);
        close();
    }

    const usersValue = [];

    cr.cr.data.cr[0].cashRegisters && cr.cr.data.cr[0].cashRegisters.map((user) => {
        const newUser = {
            value: user,
            label: users.getUserInfo(user, 'name'),
        }
        usersValue.push(newUser);
        return null;
    });

    function changeCurrency(value){
        setCurrency(value);
        setChange(0);
    }



    return(
        <>
            <Form4>
                <div className="gs-row gs-title-payment">
                    <Title2 
                        title='Traspaso'
                    />
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Moneda:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Select 
                            options={mainStates.currency}
                            onChange={(event) => changeCurrency(event.value)}
                        />
                    </div>
                </div>
                {currency !== '' && 
                    <>
                        <div className="gs-row gs-row-pay-method-electronics">
                            <div className="gs-col-6">
                                <h4 className='gs-title-info-user'>Traspaso a:</h4>
                            </div>
                            <div className="gs-col-6">
                                <Select 
                                    options={usersValue}
                                    onChange={(event) => setUser(event.value)}
                                />
                            </div>
                        </div>
                        <div className="gs-row gs-row-pay-method-electronics">
                            <div className="gs-col-6">
                                <h4 className='gs-title-info-user'>Monto $ USD:</h4>
                            </div>
                            <div className="gs-col-6">
                                <Input4 
                                    GsType='number' 
                                    min='0'
                                    GsFunction={(event) => setAmount(event.target.value)}
                                    GsPlaceholder='Monto en Dólares Americános'
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </>
                }
                {currency !== '' && currency !== 'usd' &&
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Monto en <span className="uppercase">{currency}</span>:</h4>
                        </div>
                        <div className="gs-col-6">
                            <Input4 
                                GsType='number' 
                                min='0'
                                GsFunction={(event) => setChange(event.target.value)}
                                GsPlaceholder={`Monto en ${currency}`}
                                autoComplete='off'
                            />
                        </div>
                    </div>
                }
                <div className='gs-row gs-row-buttons-method-electronics'>
                    <Button3 key='button-1'
                        Title='Agregar'
                        color='#07b2e7'
                        Function={add}
                    />
                    <Button3 key='button-2'
                        Title='Regresar'
                        color='#c12429'
                        Function={close}
                    />
                </div>
            </Form4> 
        </>
    )

}

export {Transfers};