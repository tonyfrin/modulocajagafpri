import React from "react";
import { Title2 } from "../../abstracts/Title/Title";
import { Input4 } from "../../abstracts/Input";
import { Button3 } from "../../abstracts/Button/Button";
import { Form4 } from "../../abstracts/Form";
import Select from 'react-select';
import { gsThousandsFormat } from "../../abstracts/Helpers/helpers";



const Deposit = ({ mainStates, mainActions, closeModal, accounting, check}) => {
    const checkId = check.id;
    const [bank, setBank] = React.useState('');
    const number = check.number;
    const amount = check.amount;
    const checkBank = check.bank;
    const [currency, setCurrency] = React.useState('');
    const [change, setChange] = React.useState(0);
    const [isWallet, setIsWallet] = React.useState(false);
    


    function close(){
        closeModal(); 
        setBank('');
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
            checkId: checkId,
            total: parseFloat(amount),
            currency: currency,
            change: newChange,
            bank: bank,
            number: number,
            checkBank: checkBank,
            isWallet: isWallet,

        }
        mainActions.addDeposit(newTransfer);
        close();
    }



    const valueBanks = [];

    accounting.getBanksByType('check').map((bank) => {
        const newBank = {value: bank.id, label: bank.name}
        valueBanks.push(newBank);
        return null;
    });

    function changeBank(value){
        setCurrency(accounting.getBankInfoById(value, 'currency'));
        setBank(accounting.getBankInfoById(value, 'code'));
        setIsWallet(accounting.getBankInfoById(value, 'wallet'));
        setChange(0);
    }



    return(
        <>
            <Form4>
                <div className="gs-row gs-title-payment">
                    <Title2 
                        title={`Deposito de cheque #${number}`}
                    />
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
                {currency !== '' && 
                    <>
                        <div className="gs-row gs-row-pay-method-electronics">
                            <div className="gs-col-6">
                                <h4 className='gs-title-info-user'>Banco del Cheque:</h4>
                            </div>
                            <div className="gs-col-6">
                                <span>{checkBank}</span>
                            </div>
                        </div>
                        <div className="gs-row gs-row-pay-method-electronics">
                            <div className="gs-col-6">
                                <h4 className='gs-title-info-user'>Numero del Cheque:</h4>
                            </div>
                            <div className="gs-col-6">
                                <span>{number}</span>
                            </div>
                        </div>
                        <div className="gs-row gs-row-pay-method-electronics">
                            <div className="gs-col-6">
                                <h4 className='gs-title-info-user'>Monto $ USD:</h4>
                            </div>
                            <div className="gs-col-6">
                                <span>$ {gsThousandsFormat(amount)}</span>
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

export {Deposit};