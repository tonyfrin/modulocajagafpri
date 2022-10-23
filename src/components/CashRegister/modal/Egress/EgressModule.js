import React from "react";
import { Title2 } from "../../../abstracts/Title/Title";
import { Input4 } from "../../../abstracts/Input";
import { Button3 } from "../../../abstracts/Button/Button";
import { Form4 } from "../../../abstracts/Form";
import Select from 'react-select';



const EgressModule = ({ mainStates, mainActions, closeModal, accounting}) => {
    const [amount, setAmount] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [change, setChange] = React.useState(0);
    const [project, setProject] = React.useState('');
    const [expenses, setExpenses] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [number, setNumber] = React.useState('');
    const userName = mainStates.egressUser.name;
    const userId = mainStates.egressUser.id;
    


    function close(){
        closeModal(); 
        setAmount(0);
        setCurrency('');
        setChange(0);
        setProject('');
        setExpenses();
        setDetails();
        setNumber();
    }

    function add(){
        let newChange;
        if(currency === 'usd'){
            newChange = parseFloat(amount);
        } else{
            newChange = parseFloat(change);
        }

        const newTransfer = {
            userId: userId,
            project: project,
            expenses: expenses,
            reason: details,
            number: number,
            currency: currency,
            total: parseFloat(amount),
            change: newChange,
        }
        mainActions.addEgress(newTransfer);
        close();
    }

    const proyectValue = [];

    accounting.accounting.project && accounting.accounting.project.map((project) => {
        const newUser = {
            value: project.id,
            label: project.name,
        }
        proyectValue.push(newUser);
        return null;
    });

    const expensesValue = [];

    accounting.accounting.expenses && accounting.accounting.expenses.map((expenses) => {
        const newExpenses = {
            value: expenses.id,
            label: expenses.name,
        }
        expensesValue.push(newExpenses);
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
                        title='Egreso'
                    />
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Proveedor:</h4>
                    </div>
                    <div className="gs-col-6">
                        <span>{userName}</span>
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Proyecto:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Select 
                            options={proyectValue}
                            onChange={(event) => setProject(event.value)}
                        />
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Tipo de gasto:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Select 
                            options={expensesValue}
                            onChange={(event) => setExpenses(event.value)}
                        />
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Motivo:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Input4 
                            GsType='text' 
                            GsFunction={(event) => setDetails(event.target.value)}
                            GsPlaceholder='Descripción breve del motivo del egreso'
                            autoComplete='off'
                        />
                    </div>
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Documento:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Input4 
                            GsType='text' 
                            GsFunction={(event) => setNumber(event.target.value)}
                            GsPlaceholder='Numero de documento'
                            autoComplete='off'
                        />
                    </div>
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
                    {currency !== '' && 
                        <Button3 key='button-1'
                            Title='Agregar'
                            color='#07b2e7'
                            Function={add}
                        />
                    }
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

export {EgressModule};