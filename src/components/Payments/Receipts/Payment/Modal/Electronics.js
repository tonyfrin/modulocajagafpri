import React from "react";
import { Title2 } from "../../../../abstracts/Title/Title";
import Select from 'react-select';
import { Input1, Input4 } from "../../../../abstracts/Input";
import { Button3 } from "../../../../abstracts/Button/Button";
import { Form4 } from "../../../../abstracts/Form";



const Electronics = ({ mainStates, mainActions, accounting, closeModal, method, paymentMethod}) => {
    const [bank, setBank] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [name, setName] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [change, setChange] = React.useState(0);
    const [note, setNote] = React.useState('');


    function close(){
        closeModal(); 
        setBank('');
        setNumber('');
        setName('');
        setAmount(0);
        setCurrency('');
        setChange(0);
        setNote('');
    }

    function add(){
        let newChange;
        if(currency === 'usd'){
            newChange = parseFloat(amount);
        } else{
            newChange = parseFloat(change);
        }
        const newElectronic = {
            mode: paymentMethod,
            name: method,
            isWallet: accounting.getBankInfoById(bank, 'wallet'),
            bank: accounting.getBankInfoById(bank, 'code'),
            verification: number,
            total: parseFloat(amount),
            currency: currency,
            change: newChange,
            nameSend: name,
            note: note,
        }
        if(accounting.getBankInfoById(bank, 'wallet')){
            mainActions.approvePaymentByWallet(newElectronic);
        } else{
            mainActions.addSelectPayment(newElectronic);
            close();
        }
    }

    function changeBank(bankId){
        setBank(bankId);
        setCurrency(accounting.getBankInfoById(bankId, 'currency'));
    }

    const valueBanks = [];

    mainStates.paymentMethodInfo[paymentMethod].items.map((bank) => {
        const newBank = {value: bank.id, label: bank.name}
        valueBanks.push(newBank);
        return null;
    });

    return(
        <>
            <Form4>
                <div className="gs-row gs-title-payment">
                    <Title2 
                        title='Pago Electrónico'
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
                {accounting.getBankInfoById(bank, 'wallet') &&
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Nombre de la persona que realizó el pago:</h4>
                        </div>
                        <div className="gs-col-6">
                            <Input1 
                                GsType='text' 
                                GsFunction={(event) => setName(event.target.value)}
                                GsPlaceholder='Persona o Empresa'
                                autoComplete='off'
                            />
                        </div>
                    </div>
                }
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
                {accounting.getBankInfoById(bank, 'wallet') &&
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Nota interna:</h4>
                        </div>
                        <div className="gs-col-6">
                            <Input1 
                                GsType='text' 
                                GsFunction={(event) => setNote(event.target.value)}
                                GsPlaceholder='Detalles de transacción'
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

export {Electronics};