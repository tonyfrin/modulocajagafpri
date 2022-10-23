import React from "react";
import Select from 'react-select';
import { Title1, Title2 } from "../abstracts/Title/Title";
import { Input1, Input4 } from "../abstracts/Input";
import { Button3 } from "../abstracts/Button/Button";
import { Error } from "../abstracts/Error";


const Recharge = ({ mainStates, mainActions, accounting}) => {
    const valueBanks = [];
    accounting.accounting.banks.map((bank) => {
        if(! accounting.getBankInfoById(bank.id, 'wallet')){
            const newValue = {value: bank.code, label: bank.name};
            valueBanks.push(newValue);
        }
        return null;
    });

    const valueMethod = [
        {value: 'zelle', label: 'Zelle'},
        {value: 'transferencia', label: 'Transferencia'},
    ]

    React.useEffect(() => {
        mainActions.validationDateTransfer(mainStates.dateTransfer);
        mainActions.validationMethod(mainStates.method);
        mainActions.validationBankCode(mainStates.bankCode);
        mainActions.validationNameSend(mainStates.nameSend);
        mainActions.validationVerification(mainStates.verification);
        mainActions.validationTotal(mainStates.total);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        mainActions.validationButtonActive();
    }, [mainStates.validTotal, mainStates.validNameSend, mainStates.validVerification, mainStates.validBankCode, mainStates.validDateTransfer, mainStates.validMethod]); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            <Error
                error = {mainStates.error}
            />
            <div className="gs-container-recharge">
                <Title1 title='Modulo de Banco' />
                <Title2 title='Registro de Recarga'/>
                <div className="gs-table-recharge">
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Fecha de Transacción:</h4>
                        </div>
                        <div className="gs-col-6">
                            <Input4 
                                GsType='date'
                                GsFunction={(event) => mainActions.changeDateTransfer(event.target.value)}
                                GsId='dateTransfer'
                            />
                        </div>
                    </div>
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Metodo de Pago:</h4>
                        </div>
                        <div className="gs-col-6">
                            <Select 
                                options={valueMethod}
                                onChange={(event) => mainActions.changeMethod(event.value)}
                                id='method'                            
                            />
                        </div>
                    </div>
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Banco:</h4>
                        </div>
                        <div className="gs-col-6">
                            <Select 
                                options={valueBanks}
                                onChange={(event) => mainActions.changeBankCode(event.value)}
                                id='bankCode'
                            />
                        </div>
                    </div>
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Nombre de la persona que realizó el pago:</h4>
                        </div>
                        <div className="gs-col-6">
                            <Input4 
                                GsType='text' 
                                GsFunction={(event) => mainActions.changeNameSend(event.target.value)}
                                GsPlaceholder='Persona o Empresa'
                                autoComplete='off'
                                GsId='nameSend'
                            />
                        </div>
                    </div>
                    <div className="gs-row gs-row-pay-method-electronics">
                        <div className="gs-col-6">
                            <h4 className='gs-title-info-user'>Codigo de verificación:</h4>
                        </div>
                        <div className="gs-col-6">
                            <Input1 
                                GsType='text' 
                                GsFunction={(event) => mainActions.changeVerification(event.target.value)}
                                GsPlaceholder='Numero de Transacción'
                                autoComplete='off'
                                GsId='verification'
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
                                GsFunction={(event) => mainActions.changeTotal(event.target.value)}
                                GsPlaceholder='Monto en Dólares Americános'
                                autoComplete='off'
                                GsId='total'
                            />
                        </div>
                    </div>
                    <div className='gs-row gs-row-buttons-method-electronics'>
                        <Button3 key='button-1'
                            Title='Agregar'
                            color='#07b2e7'
                            Function={mainActions.addWttIn}
                            GsId='wttInAdd'
                        />
                        <Button3 key='button-2'
                            Title='Regresar'
                            color='#c12429'
                            Function={mainActions.exitRecharge}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export {Recharge};