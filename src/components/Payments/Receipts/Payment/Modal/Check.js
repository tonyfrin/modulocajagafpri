import React from "react";
import { Title2 } from "../../../../abstracts/Title/Title";
import { Input1 } from "../../../../abstracts/Input";
import { Button3 } from "../../../../abstracts/Button/Button";
import { Form4 } from "../../../../abstracts/Form";



const Check = ({ mainActions, closeModal }) => {
    const [bank, setBank] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [amount, setAmount] = React.useState(0);


    function close() {
        closeModal();
        setBank('');
        setNumber('');
        setAmount(0);
    }

    function add() {
        const newCheck = {
            mode: 'check',
            name: 'Cheque',
            bank: bank,
            number: number,
            total: parseFloat(amount),
        }
        mainActions.addSelectPayment(newCheck);
        close();
    }

    return (
        <>
            <Form4>
                <div className="gs-row gs-title-payment">
                    <Title2
                        title='Agregar Pago'
                    />
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Metodo de Pago:</h4>
                    </div>
                    <div className="gs-col-6">
                        <p class='gs-value-title-payments'>Cheque</p>
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Banco:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Input1
                            GsType='text'
                            GsFunction={(event) => setBank(event.target.value)}
                            GsPlaceholder='Banco del Cheque'
                            autoComplete='off'
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
                            GsPlaceholder='Numero de Cheque'
                            autoComplete='off'
                        />
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Monto $ USD:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Input1
                            GsType='number'
                            min='0'
                            GsFunction={(event) => setAmount(event.target.value)}
                            GsPlaceholder='Monto en Dólares Americános'
                            autoComplete='off'
                        />
                    </div>
                </div>

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

export { Check };