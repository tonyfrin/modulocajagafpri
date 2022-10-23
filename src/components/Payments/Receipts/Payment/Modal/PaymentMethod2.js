import React from "react";
import { Title2 } from "../../../../abstracts/Title/Title";
import { Input4 } from "../../../../abstracts/Input";
import { Button3 } from "../../../../abstracts/Button/Button";
import { Form4 } from "../../../../abstracts/Form";
import Select from 'react-select';



const PaymentMethod2 = ({ mainStates, mainActions, closeModal, method, paymentMethod, users}) => {
    const [amount, setAmount] = React.useState(0);
    const [user, setUser] = React.useState(0);


    function close(){
        closeModal(); 
        setAmount(0);
        setUser(0);
    }

    function add(){
        const newCheck = {
            mode: paymentMethod,
            name: method,
            total: parseFloat(amount),
            userId: user,
        }
        mainActions.addSelectPayment(newCheck);
        close();
    }

    const usersValue = [];

    mainStates.usersPaymentInfo.map((user) => {
        const newUser = {
            value: user,
            label: users.getUserInfo(user, 'name'),
        }
        usersValue.push(newUser);
        return null;
    });


    return(
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
                        <p class='gs-value-title-payments'>{method}</p>
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Cliente:</h4>
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

export {PaymentMethod2};