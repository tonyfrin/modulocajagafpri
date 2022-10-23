import React from "react";
import { Title2 } from "../../abstracts/Title/Title";
import { Input4 } from "../../abstracts/Input";
import { Button3 } from "../../abstracts/Button/Button";
import { Form4 } from "../../abstracts/Form";
import Select from 'react-select';
import { useGafpriTransactions } from "./useGafpriTransactions";
import { Error } from "../Error";



const Transfers = ({ mainStates, mainActions, close, users, route, cr, source, currentUser, accounting, onInit}) => {
    const [amount, setAmount] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [receiveCurrency, setReceiveCurrency] = React.useState('');
    const [change, setChange] = React.useState(0);
    const [send, setSend] = React.useState(null);
    const [receive, setReceive] = React.useState(null);
    const [verification, setVerification] = React.useState('');
    const [mode, setMode] = React.useState('');
    const [modeSelect, setModeSelect] = React.useState('');
    const [sendSelect, setSendSelect] = React.useState('');
    const [receiveSelect, setReceiveSelect] =  React.useState('');
    const [currencySelect, setCurrencySelect] = React.useState('');
    const {
        // states,
        actions,
    } = useGafpriTransactions({users, route, mainActions, source, currentUser, onInit});

    

    React.useEffect(() => {
        setSendSelect(() => (
            <div className="gs-row gs-row-pay-method-electronics">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Desde:</h4>
                </div>
                <div className="gs-col-6">
                    <Select 
                        options={sendValue}
                        onChange={(event) => changeSend(event.value)}
                    />
                </div>
            </div>
        ));
        setReceiveSelect(() => (
            <div className="gs-row gs-row-pay-method-electronics">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Traspaso a:</h4>
                </div>
                <div className="gs-col-6">
                    <Select 
                        options={receiveValue}
                        onChange={(event) => changeReceive(event.value)}
                    />
                </div>
            </div>
        ));
        setCurrencySelect(() => (
            <div className="gs-row gs-row-pay-method-electronics">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Moneda:</h4>
                </div>
                <div className="gs-col-6">
                    <Select 
                        options={currencyValue}
                        onChange={(event) => changeReceiveCurrency(event.value)}
                    />
                </div>
            </div>
        ));
      }, [send, receive]); // eslint-disable-line react-hooks/exhaustive-deps

      React.useEffect(() => {
        if(send !== ''){
            let newValue = [];
            const bankId = accounting.getBankIdByCode(send);
            if(accounting.getBankInfoById(bankId, 'pagoMovil')){
                newValue.push({value: 'pagoMovil', label: 'Pago Movil'});
            }
        
            if(accounting.getBankInfoById(bankId, 'transferencia')){
                newValue.push({value: 'transferencia', label: 'Transferencia'});
            }
        
            if(accounting.getBankInfoById(bankId, 'zelle')){
                newValue.push({value: 'zelle', label: 'Zelle'});
            }
            setModeSelect(() => (
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Metodo:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Select 
                            options={newValue}
                            onChange={(event) => setMode(event.value)}
                        />
                    </div>
                </div>
            ));
        }
    }, [send]); // eslint-disable-line react-hooks/exhaustive-deps
    

    


    

    function add(){
        let newChange;
        if(change === 0){
            newChange = parseFloat(amount);
        } else{
            newChange = parseFloat(change);
        }

        const newTransfer = {
            total: parseFloat(amount),
            currency: receiveCurrency,
            change: newChange,
            send: send,
            receive: receive,
            verification: verification,
            mode: mode,
        }
        close();
        actions.addTransfers(newTransfer);
    }

    const receiveValue = [];

    cr.cr.data.cr[0].cashRegisters && cr.cr.data.cr[0].cashRegisters.map((user) => {
        const name = users.getUserInfo(user, 'name');
        const newUser = {
            value: parseInt(user),
            label: `Caja de ${name}`,
        }
        receiveValue.push(newUser);
        return null;
    });

    const sendValue = [];

    accounting.accounting.banks.map((bank) => {
        const name = bank.name;
        const newBank = {value: bank.code, label: `Banco (${name})`}
        receiveValue.push(newBank);
        sendValue.push(newBank);
        return null;
    });

    function changeReceive(value){
        setReceive(value);
        changeCurrency('');
        setReceiveCurrency('');
        if(! Number.isInteger(value) && send !== null){
            const bankIdReceive = accounting.getBankIdByCode(value);
            const bankIdSend = accounting.getBankIdByCode(send);
            setReceiveCurrency(accounting.getBankInfoById(bankIdReceive, 'currency'));
            if(accounting.getBankInfoById(bankIdReceive, 'currency') === accounting.getBankInfoById(bankIdSend, 'currency')){
                changeCurrency(accounting.getBankInfoById(bankIdSend, 'currency'));
            } else{
                const currencies = [accounting.getBankInfoById(bankIdReceive, 'currency'), accounting.getBankInfoById(bankIdSend, 'currency')];
                currencies.map((currency) =>{
                    if(currency !== 'usd'){
                        changeCurrency(currency);
                    }
                    return null;
                });
            }
        }
    }

    function changeSend(value){
        setMode('');
        setModeSelect('');
        setSend(value);
        changeCurrency('');
        if(receive !== null && ! Number.isInteger(receive)){
            const bankIdSend = accounting.getBankIdByCode(value);
            const bankIdReceive = accounting.getBankIdByCode(receive);
            if(accounting.getBankInfoById(bankIdReceive, 'currency') === accounting.getBankInfoById(bankIdSend, 'currency')){
                changeCurrency(accounting.getBankInfoById(bankIdSend, 'currency'));
            } else{
                const currencies = [accounting.getBankInfoById(bankIdReceive, 'currency'), accounting.getBankInfoById(bankIdSend, 'currency')];
                currencies.map((currency) =>{
                    if(currency !== 'usd'){
                        changeCurrency(currency);
                    }
                    return null;
                });
            }
        }
    }

    function changeCurrency(value){
        setCurrency(value);
        setChange(0);
    }

    function changeReceiveCurrency(value){
        setReceiveCurrency(value);
        console.log(`currency= ${currency}`);
        console.log(`receiveCurrency= ${receiveCurrency}`);
        console.log(`Send= ${send}`);
        if(send !== null){
            const bankIdSend = accounting.getBankIdByCode(send);
            console.log(accounting.getBankInfoById(bankIdSend, 'currency'));
            if(value === accounting.getBankInfoById(bankIdSend, 'currency')){
                changeCurrency(accounting.getBankInfoById(bankIdSend, 'currency'));
            } else{
                const currencies = [value, accounting.getBankInfoById(bankIdSend, 'currency')];
                currencies.map((currency) =>{
                    if(currency !== 'usd'){
                        changeCurrency(currency);
                    }
                    return null;
                });
            }
        }
    }

    

    const currencyValue = [
        {value: 'usd', label: 'Dólares Americános'},
        {value: 'bsd', label: 'Bolívares'},
    ];

    return(
        <>
            <div className='gs-container'>
                <Error
                    error = {mainStates.error}
                />
            </div>
            <Form4>
                <div className="gs-row gs-title-payment">
                    <Title2 
                        title='Traspaso'
                    />
                </div>
                {sendSelect}
                {receiveSelect}
                {Number.isInteger(receive) && currencySelect}
                {receive !== null &&
                    <>
                        {modeSelect}
                        <div className="gs-row gs-row-pay-method-electronics">
                            <div className="gs-col-6">
                                <h4 className='gs-title-info-user'>Confirmación:</h4>
                            </div>
                            <div className="gs-col-6">
                                <Input4 
                                    GsType='text' 
                                    min='0'
                                    GsFunction={(event) => setVerification(event.target.value)}
                                    GsPlaceholder='Numero de confirmación'
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </>
                }



                {currency !== '' && 
                    <>
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