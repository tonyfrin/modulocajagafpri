import React from 'react';
import { Title1, Title2 } from '../abstracts/Title/Title';
import { Table6 } from '../abstracts/Table';
import { gsThousandsFormat } from '../abstracts/Helpers/helpers';
import { Button4 } from '../abstracts/Button/Button';
import dayjs from "dayjs";
import { Modal } from '../Modal';
import { Transfers } from './modal/Transfers';
import { Egress } from './modal/Egress/Index';
import { Income } from './modal/Income/Index';
import { Deposit } from './modal/Deposit';

export default function CashModule({cr, users, mainStates, mainActions, accounting}) {
    const [isModal, setIsModal] = React.useState(false);
    const [section, setSection] = React.useState('');
    const [check, setCheck] = React.useState({});
    const currentCr = cr.cr.data.cr[0];
    const crId = currentCr.id;
    const crDateCreated = dayjs(currentCr.dateCreated).format("DD - MM - YYYY");
    const userName = users.getUserInfo(currentCr.authorId, 'name');
    const supervisorName = users.getUserInfo(currentCr.supervisorId, 'name');

    const expenses = cr.crTransaction.data.crTransaction.filter(function(data){
        if(data.type === 'expense' && data.status === 'gs_processing'){
            return true;
        }else{
            return false;
        }
    });

    const income = cr.crTransaction.data.crTransaction.filter(function(data){
        if(data.type === 'income' && data.status === 'gs_processing'){
            return true;
        }else{
            return false;
        }
    });

    const itemCheck = cr.crCheck.data.crCheck;

    const itemCash = cr.crCash.data.crCash;

    const itemCon = [
        {name: 'Saldo Salida', amount: mainStates.expenses, type: 'debe'},
        {name: 'Saldo Efectivo', amount: mainStates.cashFinal, type: 'debe'},
        {name: 'Saldo Cheques', amount: mainStates.checkFinal, type: 'debe'},
        {name: 'Saldo Entradas', amount: mainStates.incomes, type: 'haber'},
        {name: 'Saldo efectivo inicial', amount: mainStates.cashInit, type: 'haber'},
        {name: 'Saldo cheques inicial', amount: mainStates.checkInit, type: 'haber'},
    ];
     
    function header () {
        return(
            <>
                <tr>
                    <th>Número</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                </tr>
            </>
        )
    }

    function Items({items}) {
        let total = 0;
        return (
        <>
            {items &&
            items.map((item, index) => {
                total += parseFloat(item.amount);
                
                return (
                <tr key={item.id}>
                   
                        <td className='gs-col-3'>{item.id}</td>
                        <td className='gs-col-6'>{item.description}</td>
                        <td className='gs-col-3'>{gsThousandsFormat(item.amount)}</td>
                </tr>
            )})}
            <tr><th></th><th>Total:</th><th>$ {gsThousandsFormat(total)}</th></tr>
        </>
        );
    }

    function headerCash () {
        return(
            <>
                <tr>
                    <th>Moneda</th>
                    <th>Monto</th>
                    <th>Cambio</th>
                </tr>
            </>
        )
    }

    function ItemsCash({items}) {
        let total = 0;
        return (
        <>
            {items &&
            Object.entries(items).map((item, index) => {
                total += item[1].balance;
                let currencyName = '';
                if(item[1].currency === 'usd'){
                    currencyName = 'Dólares';
                } else if (item[1].currency === 'bsd'){
                    currencyName = 'Bolívares';
                }
                
                return (
                <tr key={index}>
                   
                        <td className='gs-col-3'>{currencyName}</td>
                        <td className='gs-col-3'>$ {gsThousandsFormat(item[1].balance)}</td>
                        <td className='gs-col-3'><span className='gs-uppercase gs-currency'>{item[1].currency}</span>{gsThousandsFormat(item[1].change)}</td>
                </tr>
            )})}
            <tr><th>Total:</th><th>{gsThousandsFormat(total)}</th></tr>
        </>
        );
    }

    function headerCheck () {
        return(
            <>
                <tr>
                    <th>#</th>
                    <th>Banco</th>
                    <th>Monto</th>
                    <th>Acciones</th>
                </tr>
            </>
        )
    }

    function ItemsCheck({items}) {
        let total = 0;
        return (
        <>
            {items &&
            items.map((item, index) => {
                total += parseFloat(item.amount);
                
                return (
                <tr key={index}>
                   
                        <td className='gs-col-3'>{item.number}</td>
                        <td className='gs-col-3'>{item.bank}</td>
                        <td className='gs-col-3'>{gsThousandsFormat(item.amount)}</td>
                        <td className='gs-col-3'>
                            <Button4
                                Title='Depositar'
                                color='#07b2e7'
                                GsKey={`button-${item.id}`}
                                Function={() => checkDeposit('deposit', item)}
                            />
                        </td>
                </tr>
            )})}
            <tr><th></th><th>Total:</th><th>{gsThousandsFormat(total)}</th></tr>
        </>
        );
    }

    function ItemsCon({items}) {
        return (
        <>
            {items &&
            items.map((item, index) => {
                
                
                return (
                <tr key={index}>
                   
                        <td className={`gs-col-6 item-table-con ${item.type}`}>{item.name}</td>
                        {item.type === 'debe' ? <td className='gs-col-3 item-table-con'>{gsThousandsFormat(item.amount)}</td> : <td className='item-table-con'></td>}
                        {item.type === 'haber' ? <td className='gs-col-3 item-table-con'>{gsThousandsFormat(item.amount)}</td> : <td className='item-table-con'></td>}
                </tr>
            )})}
            <tr><th className='gs-total-con'>Totales:</th><th className='gs-total-con'>{gsThousandsFormat(mainStates.debe)}</th><th className='gs-total-con'>{gsThousandsFormat(mainStates.haber)}</th></tr>
            <tr><th className='gs-comprobacion-con'>Comprobación del ejercicio</th><th className='gs-comprobacion-con'>{gsThousandsFormat(mainStates.verification)}</th><th className='gs-comprobacion-con'></th></tr>
        </>
        );
    }

    function headerCon () {
        return(
            <>
                <tr>
                    <th>Totales</th>
                    <th>Debe</th>
                    <th>Haber</th>
                </tr>
            </>
        )
    }

    function openModel(name){
        setIsModal(! isModal);
        setSection(name);
    }

    function closeModal(){
        setIsModal(! isModal);
        setSection('');
    }

    function checkDeposit(name, check){
        openModel(name);
        setCheck(check);
    }

  
  
return (
    <>
        <div className='gs-header-cash-register'>
            <Title1 title='Control de Caja' />
            <Title2 title={`Caja # ${crId}`}/>
            <div className='gs-row row-header-info-cash-register'>
                <div className='gs-col-4 col-header-info-cash-register'>
                    <h3>Fecha de apertura:<span>{crDateCreated}</span></h3>
                </div>
                <div className='gs-col-4 col-header-info-cash-register'>
                    <h3>Responsable:<span>{userName}</span></h3>
                </div>
                <div className='gs-col-4 col-header-info-cash-register'>
                    <h3>Supervisor:<span>{supervisorName}</span></h3>
                </div>
            </div>
        </div>
        <div className='gs-row gs-main-cash-register'>
            <div className='gs-col-7 gs-col-main-cash-register'>
                <Table6 
                    Items={expenses}
                    Header={header}
                    ItemList={Items}
                    SubTitle='Salidas'
                    isButton={true}
                    TitleButton='Traspaso'
                    color='#07b2e7'
                    isButton2={true}
                    FunctionButton={() => openModel('traspaso')}
                    TitleButton2='Egreso'
                    color2='#07b2e7'
                    FunctionButton2={() => openModel('egress')}
                    buttonSmall={true}
                /> 
                <Table6 
                    Items={income}
                    Header={header}
                    ItemList={Items}
                    SubTitle='Entradas'
                    isButton={true}
                    TitleButton='Entrada'
                    color='#07b2e7'
                    buttonSmall={true}
                    FunctionButton={() => openModel('income')}
                /> 
                <div className='gs-row'>
                    <Table6 
                        Items={itemCash}
                        Header={headerCash}
                        ItemList={ItemsCash}
                        SubTitle='Efectivo'
                    /> 
                    <Table6 
                        Items={itemCheck}
                        Header={headerCheck}
                        ItemList={ItemsCheck}
                        SubTitle='Cheques'
                    /> 
                </div>
            </div>
            <div className='gs-col-5 gs-col-main-cash-register'>
                <Table6 
                    Items={itemCon}
                    Header={headerCon}
                    ItemList={ItemsCon}
                    SubTitle='Conciliación'
                    classBox='gs-box-concialicion'
                    classContainer='gs-container-conciliacion'
                    classTable='gs-table-conciliacion'
                    classThead='gs-thead-conciliacion'
                    isButton={true}
                    TitleButton='Conciliar caja'
                    color='#07b2e7'
                    classRowButton='gs-row-button-conciliacion'
                    FunctionButton={() => mainActions.conciliate({crId: crId})}
                /> 
            </div>
            {isModal ? 
                    <Modal>
                        {section === 'traspaso' && <Transfers mainActions={mainActions} mainStates={mainStates} users={users} cr={cr} closeModal={closeModal}/>}
                        {section === 'egress' && <Egress mainActions={mainActions} mainStates={mainStates} users={users} cr={cr} closeModal={closeModal} accounting={accounting}/>}
                        {section === 'income' && <Income mainActions={mainActions} mainStates={mainStates} users={users} cr={cr} closeModal={closeModal} accounting={accounting}/>}
                        {section === 'deposit' && <Deposit mainActions={mainActions} mainStates={mainStates} closeModal={closeModal} accounting={accounting} check={check}/>}
                    </Modal> :
                null
            }
        </div>
    </>
  )
}
