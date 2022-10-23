import React from "react";
import { Title2 } from "../../../../abstracts/Title/Title";
import Select from 'react-select';
import { Input1, Input4 } from "../../../../abstracts/Input";
import { Button3 } from "../../../../abstracts/Button/Button";
import { Form4 } from "../../../../abstracts/Form";



const ElectronicsTurned = ({ mainStates, mainActions, accounting, closeModal, method, paymentMethod}) => {
    const [bank, setBank] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [change, setChange] = React.useState(0);


    function close(){
        closeModal(); 
        setBank('');
        setNumber('');
        setAmount(0);
        setCurrency('');
        setChange(0);
    }

    function add(){
        const newElectronic = {
            mode: paymentMethod,
            name: method,
            bank: bank,
            verification: number,
            total: parseFloat(amount),
            currency: currency,
            change: parseFloat(change),
        }
        mainActions.addSelectTurned(newElectronic);
        close();
    }

    function changeBank(bankId){
        setBank(bankId);
        setCurrency(accounting.getBankInfoById(bankId, 'currency'));
    }

    const valueBanks = [];

    mainStates.turnedMethodInfo[paymentMethod].items.map((bank) => {
        if(! accounting.getBankInfoById(bank.id, 'wallet')){
            const newBank = {value: bank.id, label: bank.name}
            valueBanks.push(newBank);
        }
        return null;
    });

    return(
        <>
            <Form4>
                <div className="gs-row gs-title-payment">
                    <Title2 
                        title='Vuelto Electrónico'
                    />
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Metodo de Pago:</h4>
                    </div>
                    <div className="gs-col-6">
                        <p class='gs-value-title-payments'>{method}</p>
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Banco:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Select 
                            options={valueBanks}
                            onChange={(event) => changeBank(event.value)}
                        />
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Numero:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Input1 
                            GsType='text' 
                            GsFunction={(event) => setNumber(event.target.value)}
                            GsPlaceholder='Numero de Transacción'
                            autoComplete='off'
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
                {currency !== 'usd' && currency !== '' &&
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Monto en <span className="gs-uppercase">{currency}:</span></h4>
                        </div>
                        <div className="gs-col-6">
                            <Input1 
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

export {ElectronicsTurned};