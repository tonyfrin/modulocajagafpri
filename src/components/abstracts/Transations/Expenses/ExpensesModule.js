import React from "react";
import { Title2 } from "../../Title/Title";
import { Input4 } from "../../Input";
import { Button3 } from "../../Button/Button";
import { Form4 } from "../../Form";
import Select from 'react-select';



const ExpensesModule = ({ mainStates, mainActions, accounting, expensesModule}) => {
    const moduleExpenses = expensesModule || false;
    const [amount, setAmount] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [change, setChange] = React.useState(0);
    const [project, setProject] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [bank, setBank] = React.useState('');
    const [mode, setMode] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [document, setDocument] = React.useState('');
    const [note, setNote] = React.useState('');
    const [isWallet, setIsWallet] = React.useState(false);
    const [expenses, setExpenses] = React.useState('');
    const userName = mainStates.selectUser.name;
    const userId = mainStates.selectUser.id;
    const [userCreditId, setUserCreditId] = React.useState(false);
    const [modeSelect, setModeSelect] = React.useState('');
    const [expensesSelect, setExpensesSelect] = React.useState('');
    const [bankSelect, setBankSelect] = React.useState('');
    const [usersSelect, setUsersSelect] = React.useState('');

    React.useEffect(() => {
        if(bank !== ''){
            let newValue = [];
            const bankId = accounting.getBankIdByCode(bank);
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
    }, [bank]); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        setExpensesSelect(() => (
            <div className="gs-row gs-row-pay-method-electronics">
                <div className="gs-col-6">
                    <h4 className='gs-title-info-user'>Tipo de Gasto:</h4>
                </div>
                <div className="gs-col-6">
                    <Select 
                        options={expensesValue}
                        onChange={(event) => setExpenses(event.value)}
                    />
                </div>
            </div>
        ));

        setBankSelect(() => (
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
        ));

        if(moduleExpenses){
            setUsersSelect(() => (
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Tipo de Pago:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Select 
                            options={usersValue}
                            onChange={(event) => setUserCreditId(event.value)}
                        />
                    </div>
                </div>
            ));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    


    function close(){
        setAmount(0);
        setCurrency('');
        setChange(0);
        setProject('');
        setDetails('');
        setBank('');
        setMode('');
        setNumber('');
        setDocument('');
        setNote('');
        setIsWallet(false);
        setExpenses('');
        mainActions.onIsUser();
    }

    function add(){
        let newChange;
        if(moduleExpenses){
            newChange = parseFloat(amount);
        } else{
            if(currency === 'usd'){
                newChange = parseFloat(amount);
            } else{
                newChange = parseFloat(change);
            }
        }

        const newTransfer = {
            userId: userId,
            project: project,
            reason: details,
            currency: currency,
            total: parseFloat(amount),
            change: newChange,
            bank: bank,
            isWallet: isWallet,
            mode: mode,
            verification: number,
            number: document,
            note: note,
            expenses: expenses,
            userCreditId: userCreditId,
        }
        mainActions.addTransfers(newTransfer);
        console.log(newTransfer);
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

    const usersValue = [];
    if(moduleExpenses){
        usersValue.push({value: mainStates.selectUser.id, label: 'A Crédito'});
        accounting.accounting.tdc.map((item) => {
            const newUser = {value: item.userId, label: item.name}
            usersValue.push(newUser);
            return null;
        });
    }

    


    const valueBanks = [];

    accounting.accounting.banks.map((bank) => {
        if(! bank.wallet){
            const newBank = {value: bank.id, label: bank.name}
            valueBanks.push(newBank);
        }
        return null;
    });

    function changeBank(value){
        setModeSelect('');
        setMode('');
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
                        title='Egreso'
                    />
                </div>
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Cliente:</h4>
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
                {expensesSelect}
                <div className="gs-row gs-row-pay-method-electronics">
                    <div className="gs-col-6">
                        <h4 className='gs-title-info-user'>Numero de documento:</h4>
                    </div>
                    <div className="gs-col-6">
                        <Input4
                            GsType='text' 
                            GsFunction={(event) => setDocument(event.target.value)}
                            GsPlaceholder='Numero de factura o nota'
                            autoComplete='off'
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
                            GsPlaceholder='Descripción breve del motivo del ingreso'
                            autoComplete='off'
                        />
                    </div>
                </div>
                {moduleExpenses && usersSelect}
                {! moduleExpenses && bankSelect}
                
                {currency !== '' && 
                    <>
                    {modeSelect}
                        <div className="gs-row gs-row-pay-method-electronics">
                            <div className="gs-col-6">
                                <h4 className='gs-title-info-user'>Confirmación:</h4>
                            </div>
                            <div className="gs-col-6">
                                <Input4 
                                    GsType='text' 
                                    GsFunction={(event) => setNumber(event.target.value)}
                                    GsPlaceholder='Numero de confirmación'
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className="gs-row gs-row-pay-method-electronics">
                            <div className="gs-col-6">
                                <h4 className='gs-title-info-user'>Nota interna:</h4>
                            </div>
                            <div className="gs-col-6">
                                <Input4 
                                    GsType='text' 
                                    GsFunction={(event) => setNote(event.target.value)}
                                    GsPlaceholder='Detalles de la transacción'
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
                {moduleExpenses && 
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
                }
                
                <div className='gs-row gs-row-buttons-method-electronics'>
                    {currency !== '' && 
                        <Button3 key='button-1'
                            Title='Agregar'
                            color='#07b2e7'
                            Function={add}
                        />
                    }
                    {moduleExpenses && 
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

export {ExpensesModule};